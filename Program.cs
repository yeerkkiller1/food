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
                        Console.WriteLine(message);
                    };

                    await connected.Task;

                    ws.Send(JsonConvert.SerializeObject(new object[] { "okaygo", 2560, 1440, 2 }));

                    Task.Run((Action)(() =>
                    {
                        controller.Move();
                    }), token.Token);

                    await closed.Task;
                }
            }

            done.Release();
        }

        class World
        {
            public object time;
            public long max_units;
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

        class Unit
        {
            public int x;
            public int y;
            public double angle;
            public long actions = 0;
            public object u;
            public object p;
            public object t;
            public object n;
            public object r;
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
                world.max_units = (long)c[2];
                user.id = (long)c[1];
                user.uid = user.id * world.max_units;
                //user.cam.change(c[4], c[5]);
                world.players = new List<Player>();
                for (int d = 0; d < (long)c[6]; d++)
                    world.players.Add(new Player());

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
                short[] c = new short[f.Length / 2];
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
                    var t = c[n + 4];

                    var r = p * world.max_units + t;
                    if (false) //(q & STATE.DELETE)
                    {
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
                        unit.u = u;
                        unit.p = p;
                        unit.t = t;
                        unit.n = n;
                        unit.r = r;

                        world.units[r] = unit;
                        Console.WriteLine(JsonConvert.SerializeObject(unit));

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

            public void Move()
            {

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
