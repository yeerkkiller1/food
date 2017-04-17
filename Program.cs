//using Alchemy;
//using Alchemy;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Sockets;
//using System.Net.Sockets;
//using System.Net.WebSockets;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using WebSocketSharp;
using System.Linq;
using Newtonsoft.Json.Linq;

namespace Starveio
{
    class Program
    {
        static Semaphore done = new Semaphore(0, 1);
        static void Main(string[] args)
        {
            var start = new Program();
            start.Connect();
            done.WaitOne();
        }


        async void Connect()
        {
            string url = "ws://45.63.27.96:8080/";

            var world = new World();
            var user = new User();

            AIMode aiMode = new MoveToPosition(5000, 5000, 100);

            using (var ws = new WebSocket(url))
            {
                var controller = new Controller(ws);

                using (var token = new CancellationTokenSource())
                {
                    var connected = new TaskCompletionSource<bool>();
                    var closed = new TaskCompletionSource<bool>();
                    ws.OnOpen += (x, y) =>
                    {
                        Console.WriteLine("Connected");
                        connected.SetResult(true);
                    };
                    ws.OnClose += (x, y) => { Console.WriteLine("Disconnected"); closed.SetResult(true); };

                    ws.Connect();

                    ws.OnMessage += (t, e) =>
                    {
                        var message = new Message(e, world, user);
                        //Console.WriteLine(message);
                    };

                    await connected.Task;

                    ws.Send(JsonConvert.SerializeObject(new object[] { "okaygo", 2560, 1440, 2 }));

                    Task aiTask = Task.Run(async () =>
                    {
                        while (!token.Token.IsCancellationRequested)
                        {
                            aiMode = aiMode.Do(world, user, controller);
                            await Task.Delay(100);
                        }
                    });

                    await closed.Task;
                }
            }

            done.Release();
        }

        interface AIMode
        {
            AIMode Do(World world, User user, Controller controller);
        }
        class MoveToPosition : AIMode
        {
            public MoveToPosition(int x, int y, double distance)
            {
                this.x = x;
                this.y = y;
                this.distance = distance;
            }

            public int x;
            public int y;
            public double distance;

            private int lastUserX;
            private int lastUserY;

            public AIMode Do(World world, User user, Controller controller)
            {
                if (!world.units.ContainsKey(user.uid)) return this;
                var self = world.units[user.uid];

                //controller.Move(new Controller.MoveKeys[] { Controller.MoveKeys.Right });

                ///Console.WriteLine("At " + self.x + ", " + self.y);

                int offX = self.x - x;
                int offY = self.y - y;

                double curDistance = Math.Sqrt(offX * offX + offY * offY);
                if (curDistance < distance)
                {
                    controller.Move(new Controller.MoveKeys[] { });
                }
                else
                {
                    Controller.MoveKeys xMove = offX > 0 ? Controller.MoveKeys.Left : Controller.MoveKeys.Right;
                    Controller.MoveKeys yMove = offY > 0 ? Controller.MoveKeys.Top : Controller.MoveKeys.Bottom;

                    var keys = new Controller.MoveKeys[] { xMove, yMove }.ToList();

                    if (self.x == lastUserX && self.y == lastUserY && keys.Count > 1)
                    {
                        keys.RemoveRange(1, keys.Count - 1);
                    }

                    controller.Move(keys.ToArray());
                }

                Console.WriteLine("At " + self.x + ", " + self.y);
                lastUserX = self.x;
                lastUserY = self.y;
                

                return this;
            }
        }

        class World
        {
            public object time;
            public int max_units;
            public List<Player> players;
            public Dictionary<long, Unit> units = new Dictionary<long, Unit>();
        }

        class User
        {
            public long id;
            public long uid;
        }

        class Player
        {
            public string nickname;
            public object score;
            public bool alive;
        }

        enum ActionStates
        {
            DELETE = 1,
            HURT = 2,
            COLD = 4,
            HUNGER = 8,
            ATTACK = 16,
            WALK = 32,
            IDLE = 64,
            HEAL = 128,
            WEB = 256
        }

        class Unit
        {
            Dictionary<int, string> ITEMS = new Dictionary<int, string>()
            {
                {0,"PLAYERS"  },
                {1,"FIRE" },
                {2,"WORKBENCH" },
                {3,"SEED" },
                {4,"WALL" },
                {5,"SPIKE" },
                {6,"BIG_FIRE" },
                {7,"STONE_WALL" },
                {8,"GOLD_WALL" },
                {9,"DIAMOND_WALL" },
                {10,"WOOD_DOOR" },
                {11,"CHEST" },
                {12,"STONE_SPIKE" },
                {13,"GOLD_SPIKE" },
                {14,"DIAMOND_SPIKE" },
                {15,"STONE_DOOR" },
                {16,"GOLD_DOOR" },
                {17,"DIAMOND_DOOR" },
                {18,"FURNACE" },
                {60,"RABBIT" },
                {61,"WOLF" },
                {62,"SPIDER" },
                {100,"FRUIT" }
            };


            public int x;
            public int y;
            public double angle;
            public long actions = 0;
            public int type;
            public int pid;
            public int id;
            public object info;
            public int uid;

            /*
             *     this.type = c;
    this.pid = g;
    this.id = f;
    this.x = d;
    this.y = e;
    this.nangle = this.angle = m;
    this.action = n;
    this.info = p;
    this.r = {
        x: d,
        y: e
    };
    world && (this.uid = g * world.max_units + f);
    switch (c) {
    case ITEMS.PLAYERS:
             */

            public override string ToString()
            {
                return x + ", " + y + " (" + ITEMS[type] + ")";
            }
        }

        class Message
        {
            public readonly string Type;

            WebSocketSharp.MessageEventArgs e;
            World world;
            User user;
            public Message(WebSocketSharp.MessageEventArgs e, World world, User user)
            {
                this.e = e;
                this.world = world;
                this.user = user;

                if (e.Data != null)
                {
                    var payload = JsonConvert.DeserializeObject<object[]>(e.Data);
                    long type = (long)payload[0];
                    switch (type)
                    {
                        case 0: Type = "chat"; break;
                        case 1: Type = "kick"; break;
                        case 2: Type = "new_player"; break;
                        case 3: Type = "handshake"; ParseHandshake(payload); break;
                        default: Type = "unknown text" + type; break;
                    }
                }
                else
                {

                    switch (e.RawData[0])
                    {
                        case 0: Type = "units"; ParseUnits(false); break;
                        case 1: Type = "units2"; ParseUnits(true); break;
                        case 2: Type = "killed"; break;
                        case 3: Type = "set_cam"; break;
                        case 4: Type = "mute"; break;
                        case 5: Type = "full"; break;
                        case 6: Type = "leaderboard"; break;
                        case 7: Type = "kill_player"; break;
                        case 8: Type = "old_verison"; break;
                        case 9: Type = "hitten"; break;
                        case 10: Type = "get_time"; break;
                        case 11: Type = "gauges"; break;
                        case 12: Type = "empty_res"; break;
                        case 13: Type = "inv_full"; break;
                        case 14: Type = "gather"; break;
                        case 15: Type = "survive"; break;
                        case 16: Type = "build_ok"; break;
                        case 17: Type = "build_stop"; break;
                        case 18: Type = "accept_build"; break;
                        case 19: Type = "workbench"; break;
                        case 20: Type = "fire"; break;
                        case 21: Type = "dont_harvest"; break;
                        case 22: Type = "hitten_other"; break;
                        case 23: Type = "decrease_item"; break;
                        case 24: Type = "recover_focus"; break;
                        case 25: Type = "cancel_craft"; break;
                        default: Type = "unknown binary"; break;
                    }
                }
            }

            void ParseHandshake(object[] c)
            {
                world.time = c[7];
                world.max_units = (int)(long)c[2];
                user.id = (long)c[1];
                user.uid = user.id * world.max_units;
                //user.cam.change(c[4], c[5]);
                world.players = new List<Player>();
                for (int d = 0; d < (long)c[6]; d++)
                    world.players.Add(new Player());

                Console.WriteLine(JsonConvert.SerializeObject(user));

                JArray playersRaw = (JArray)c[3];
                for (int d = 0; d < playersRaw.Count; d++)
                {
                    var value = playersRaw[d];

                    Player e = world.players[value["i"].ToObject<int>()];
                    e.nickname = value["n"].ToObject<string>();
                    e.score = value["p"].ToObject<long>();
                    e.alive = true;

                    Console.WriteLine(JsonConvert.SerializeObject(e));
                }
                //user.ldb.sort();
                //ui.quit(game.run)

            }

            void ParseUnits(bool resetWorld = false)
            {
                var d = resetWorld;
                var f = e.RawData;
                ushort[] c = new ushort[f.Length / 2];
                Buffer.BlockCopy(f, 0, c, 0, f.Length);
                if (resetWorld)
                {
                    //world.delete_all_units();
                }
                int unitCount = (f.Length - 2) / 12;
                for (var e = 0; e < unitCount; e++)
                {
                    var m = 2 + 12 * e;
                    var n = 1 + 6 * e;
                    var p = f[m];
                    var action = f[m + 1];
                    var id = c[n + 4];

                    int uid = p * world.max_units + id;
                    if ((action & (int)ActionStates.DELETE) != 0) //(q & STATE.DELETE)
                    {
                        Console.WriteLine("Delete " + uid);
                        world.units.Remove(uid);
                        //world.delete_units(r);
                    }
                    else
                    {

                        var u = f[m + 2];
                        var x = c[n + 2];
                        var y = c[n + 3];
                        n = c[n + 5];
                        double angle = f[m + 3] / 255 * Math.PI * 2;

                        var unit = new Unit();
                        unit.x = x;
                        unit.y = y;
                        unit.angle = angle;
                        unit.actions = unit.actions | action;
                        unit.type = u;
                        unit.pid = p;
                        unit.id = id;
                        unit.info = n;
                        unit.uid = uid;
                        if (x == 0 && y == 0)
                        {
                            Console.WriteLine("Not position for " + unit.uid);
                            if(unit.uid == user.uid)
                            {
                                int crap = 1;
                            }
                            continue;
                        }
                        world.units[uid] = unit;
                        //Console.WriteLine(unit.ToString());

                        /*
                        if(world.fast_units[r])
                        {
                            r = world.fast_units[r];
                            r.r.x = x;
                            r.r.y = y;
                            
                            if (0 != p && Utils.dist(r, r.r) > CLIENT.LAG_DISTANCE) {
                                r.x = x;
                                r.y = y;
                            }
                            
                            if (r.id != user.id)
                            {
                                r.nangle = angle;
                            }
                            r.action |= action;
                            r.info = n;
                            r.update && r.update(action);
                        }
                        else
                        {
                            p = new Item(u, p, t, x, y, angle, action, n);
                            world.fast_units[r] = p;
                            world.units[u].push(p);
                        }
                        */
                    }
                }
            }

            public override string ToString()
            {
                return Type; // +  $"{Type} ({e?.RawData.Length})";
            }
        }

        class Controller
        {
            WebSocket socket;
            public Controller(WebSocket socket)
            {
                this.socket = socket;
            }

            // 1 = update cam
            // 2 = move
            // 3 = send angle

            public enum MoveKeys
            {
                Left = 1,
                Right = 2,
                Bottom = 4,
                Top = 8
            }

            private MoveKeys[] lastKeys;
            int hack = 10;
            public void Move(MoveKeys[] keys)
            {
                if(lastKeys != null && JsonConvert.SerializeObject(lastKeys) == JsonConvert.SerializeObject(keys))
                {
                    hack--;
                    if (hack < 0)
                    {
                        hack = 10;
                    }
                    else
                    {
                        return;
                    }
                }
                lastKeys = keys;
                int c = 0;
                for(int i = 0; i < keys.Length; i++)
                {
                    c |= (int)keys[i];
                }

                Console.WriteLine("Move " + string.Join(",", keys.Select(x => Enum.GetName(typeof(MoveKeys), x))));
                this.socket.Send(JsonConvert.SerializeObject(new object[] { 2, c }));
            }
        }

        /*
         *  if (this._current_id == c._current_id)
                if ("string" == typeof f.data)
                    switch (f = JSON.parse(f.data),
                    f[0]) {
                    case 0:
                        c.chat(f);
                        break;
                    case 1:
                        c.kick(f[1]);
                        break;
                    case 2:
                        c.new_player(f);
                        break;
                    case 3:
                        c.handshake(f)
                    }
                else {
                    var d = new Uint8Array(f.data);
                    switch (d[0]) {
                    case 0:
                        c.units(f.data, d, !1);
                        break;
                    case 1:
                        c.units(f.data, d, !0);
                        break;
                    case 2:
                        c.killed(d[1]);
                        break;
                    case 3:
                        c.set_cam(f.data);
                        break;
                    case 4:
                        c.mute();
                        break;
                    case 5:
                        c.full();
                        break;
                    case 6:
                        c.leaderboard(f.data);
                        break;
                    case 7:
                        c.kill_player(d[1]);
                        break;
                    case 8:
                        c.old_version();
                        break;
                    case 9:
                        c.hitten(f.data);
                        break;
                    case 10:
                        c.get_time(d[1]);
                        break;
                    case 11:
                        c.gauges(d[1], d[2], d[3]);
                        break;
                    case 12:
                        c.empty_res();
                        break;
                    case 13:
                        c.inv_full();
                        break;
                    case 14:
                        c.gather(d);
                        break;
                    case 15:
                        c.survive();
                        break;
                    case 16:
                        c.build_ok(d[1]);
                        break;
                    case 17:
                        c.build_stop();
                        break;
                    case 18:
                        c.accept_build(d[1]);
                        break;
                    case 19:
                        c.workbench(d[1]);
                        break;
                    case 20:
                        c.fire(d[1]);
                        break;
                    case 21:
                        c.dont_harvest();
                        break;
                    case 22:
                        c.hitten_other(d, f.data);
                        break;
                    case 23:
                        c.decrease_item(d[1], d[2]);
                        break;
                    case 24:
                        c.recover_focus(f.data);
                        break;
                    case 25:
                        c.cancel_craft()
                    }
                }
        }
         */
    }
}
