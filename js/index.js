window.onload = function () {


    console.log('Page loaded');


    (function () {

        // Screen dimensions...

        var screen_w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var screen_h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        console.log('Screen Width: ' + screen_w);
        console.log('Screen Height: ' + screen_h);

        // Empty array for objects to destroy...

        var destroy_list = [];

        // Is the browser Firefox?

        var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

        // Gravity direction...

        var gravity_direction = 0;

        // User data...

        var user_data = 1;

        // Is info open

        var info_flag = 0;

        // Social Images...

        var img_info = document.getElementById("imageInfo");
        var img_default = document.getElementById("imageDefault");

        //var img_tumblr = document.getElementById("imageTumblr");
        //var img_producthunt = document.getElementById("imageProductHunt");
        //var img_pinterest = document.getElementById("imagePinterest");
        //var img_vsco = document.getElementById("imageVSCO");

        // Generic Styling...

        var stroke_width = 1;

        var default_colour = '#11111a';
        var default_fill = '#11111a';
        var default_stroke = '#55555a';
        var default_img = img_default;

        var background_colour = '#11111a';
        var background_fill = background_colour;
        var background_stroke = background_colour;

        var info_colour = '#ffffff';
        var info_fill = '#ffffff';
        var info_stroke = '#ddddda';
        var info_img = img_info;


        // Box styles...

        //Hackerearth
        var hackerearth_number = 1001;
        var hackerearth_colour = '#2c3454';
        var hackerearth_fill = default_fill;
        var hackerearth_stroke = default_stroke;
        var hackerearth_img_file = document.getElementById("imageHackerearth");
        var hackerearth_img = default_img;

        //Linkedin
        var linkedin_number = 1002;
        var linkedin_colour = '#1769ff';
        var linkedin_fill = default_fill;
        var linkedin_stroke = default_stroke;
        var linkedin_img_file = document.getElementById("imageLinkedin");
        var linkedin_img = default_img;

        //Github
        var github_number = 1003;
        var github_colour = '#e12c2c';
        var github_fill = default_fill;
        var github_stroke = default_stroke;
        var github_img_file = document.getElementById("imageGithub");
        var github_img = default_img;

        //Instagram
        var instagram_number = 1004;
        var instagram_colour = '#833ab4';
        var instagram_fill = default_fill;
        var instagram_stroke = default_stroke;
        var instagram_img_file = document.getElementById("imageInstagram");
        var instagram_img = default_img;

        //Twitter
        var twitter_number = 1005;
        var twitter_colour = '#1da1f2';
        var twitter_fill = default_fill;
        var twitter_stroke = default_stroke;
        var twitter_img_file = document.getElementById("imageTwitter");
        var twitter_img = default_img;

        //Resume
        var resume_number = 1006;
        var resume_colour = '#6a14a4';
        var resume_fill = default_fill;
        var resume_stroke = default_stroke;
        var resume_img_file = document.getElementById("imageResume");
        var resume_img = default_img;

        //CodeForces
        var codeforces_number = 1007;
        var codeforces_colour = '#ffffff';
        var codeforces_fill = default_fill;
        var codeforces_stroke = default_stroke;
        var codeforces_img_file = document.getElementById("imageCodeforces");
        var codeforces_img = default_img;

        //Hackerrank
        var hackerrank_number = 1008;
        var hackerrank_colour = '#2fc362';
        var hackerrank_fill = default_fill;
        var hackerrank_stroke = default_stroke;;
        var hackerrank_img_file = document.getElementById("imageHackerrank");
        var hackerrank_img = default_img;

        //email
        var email_number = 1009;
        var email_colour = '#0044ff';
        var email_fill = default_fill;
        var email_stroke = default_stroke;;
        var email_img_file = document.getElementById("imageEmail");
        var email_img = default_img;


        var base_size = 1;

        $(window).resize(function () {

            var screen_w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var screen_h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

            canvas = document.getElementById("canvas-body");
            canvas.width = (screen_w * 2);
            canvas.height = (screen_h * 2);

            ctx = canvas.getContext("2d");
            ctx.scale(2, 2);

            for (b = world.GetBodyList(); b; b = b.GetNext()) {

                if (b.BoxNumber == 'ground' || b.BoxNumber == 'right' || b.BoxNumber == 'roof') {

                    destroy_list.push(b);

                }
            }

            // New Roof

            user_data = 'roof';

            add.box({

                x: 0.5,
                y: 0.5,

                height: 1,
                width: screen_w / 15,

                color: background_fill,
                img_src: 999,
                isStatic: true

            });

            //New Floor

            user_data = 'ground';

            add.box({

                x: 0.5,
                y: (screen_h / 30) - 0.5,

                height: 1,
                width: screen_w / 15,

                color: background_fill,
                img_src: 999,
                isStatic: true

            });

            //New Wall

            user_data = 'right';

            add.box({

                x: (screen_w / 30) - 0.5,
                y: 0.5,

                width: 1,
                height: 100,

                color: background_fill,
                img_src: 999,
                isStatic: true

            });


        });

        // Init som useful stuff for easier access (don't need 'em all)

        var b2Vec2 = Box2D.Common.Math.b2Vec2
            , b2AABB = Box2D.Collision.b2AABB
            , b2BodyDef = Box2D.Dynamics.b2BodyDef
            , b2Body = Box2D.Dynamics.b2Body
            , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
            , b2Fixture = Box2D.Dynamics.b2Fixture
            , b2World = Box2D.Dynamics.b2World
            , b2MassData = Box2D.Collision.Shapes.b2MassData
            , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
            , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
            , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
            , b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
            , b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;

        // http://paulirish.com/2011/requestanimationframe-for-smart-animating/

        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (/* function */ callback, /* DOMElement */ element) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        var SCALE,
            canvas,
            world,
            fixDef,
            ctx,
            width,
            height,
            shapes = {},
            needToDraw = false;

        var debug = false;

        var init = {

            start: function (id) {

                this.defaultProperties();
                this.canvas(id);

                box2d.create.world();
                box2d.create.defaultFixture();

                this.surroundings.leftWall();
                this.surroundings.rightWall();
                this.surroundings.ground();

                this.callbacks();

                if (screen_w < 600) {
                    var total_random = 5;
                    base_size = 0.7;
                }
                else {

                    var total_random = 25;

                }
                for (var i = 0; i < total_random; ++i) {

                    user_data = i;
                    add.random();

                }


                for (var i = 1001; i <= 1009; ++i) {

                    user_data = i;

                    add.box({

                        width: 3.2 * base_size,
                        height: 3.2 * base_size,
                        color: '#eb8c1c',
                        img_src: i

                    });

                }

                // On my signal: Unleash hell.

                (function hell() {

                    loop.step();
                    loop.update();

                    if (debug) {
                        //console.log('DEBUG MODE ON');
                        world.DrawDebugData();
                    }

                    loop.draw();
                    requestAnimFrame(hell);

                })();
            },

            defaultProperties: function () {
                SCALE = 30;
            },

            canvas: function (id) {

                canvas = document.getElementById(id);
                canvas.width = (screen_w * 2);
                canvas.height = (screen_h * 2);
                ctx = canvas.getContext("2d");
                ctx.scale(2, 2);

            },

            surroundings: {

                leftWall: function () {

                    user_data = 'left';

                    add.box({

                        x: 0.5,
                        y: 1,

                        height: 100,
                        width: 1,

                        color: '#ff0000',
                        img_src: 999,
                        isStatic: true

                    });
                },

                rightWall: function () {

                    user_data = 'right';

                    add.box({

                        x: (screen_w / 30) - 0.5,
                        y: 0.5,

                        width: 1,
                        height: 100,

                        color: '#ff0000',
                        img_src: 999,
                        isStatic: true

                    });
                },
                ground: function () {

                    user_data = 'ground';

                    add.box({

                        x: 0.5,
                        y: (screen_h / 30) - 0.5,

                        height: 1,
                        width: screen_w / 15,

                        color: '#ffff00',
                        img_src: 999,
                        isStatic: true

                    });
                }

            },
            callbacks: function () {


                $('#menu-container').click(function () {


                    if (info_flag == 1) {

                        info_flag = 0;

                        $('#canvas-body').removeClass('info');
                        $('.menu-icon').removeClass('info');
                        $('.gravity-icon').removeClass('info');
                        $('#info-container').removeClass('info');

                        hackerearth_fill = default_fill;
                        hackerearth_stroke = default_stroke;
                        hackerearth_img = default_img;

                        linkedin_fill = default_fill;
                        linkedin_stroke = default_stroke;
                        linkedin_img = default_img;

                        github_fill = default_fill;
                        github_stroke = default_stroke;
                        github_img = default_img;

                        instagram_fill = default_fill;
                        instagram_stroke = default_stroke;
                        instagram_img = default_img;

                        twitter_fill = default_fill;
                        twitter_stroke = default_stroke;
                        twitter_img = default_img;

                        resume_fill = default_fill;
                        resume_stroke = default_stroke;
                        resume_img = default_img;

                        codeforces_fill = default_fill;
                        codeforces_stroke = default_stroke;
                        codeforces_img = default_img;

                        hackerrank_fill = default_fill;
                        hackerrank_stroke = default_stroke;
                        hackerrank_img = default_img;

                        email_fill = default_fill;
                        email_stroke = default_stroke;
                        email_img = default_img;

                    }

                    else {

                        info_flag = 1;

                        $('#canvas-body').addClass('info');
                        $('.menu-icon').addClass('info');
                        $('.gravity-icon').addClass('info');
                        $('#info-container').addClass('info');

                        hackerearth_fill = info_colour;
                        linkedin_fill = info_colour;
                        github_fill = info_colour;
                        instagram_fill = info_colour;
                        twitter_fill = info_colour;
                        resume_fill = info_colour;
                        codeforces_fill = info_colour;
                        hackerrank_fill = info_colour;
                        email_fill = info_colour;

                        hackerearth_stroke = info_stroke;
                        linkedin_stroke = info_stroke;
                        github_stroke = info_stroke;
                        instagram_stroke = info_stroke;
                        twitter_stroke = info_stroke;
                        resume_stroke = info_stroke;
                        codeforces_stroke = info_stroke;
                        hackerrank_stroke = info_stroke;
                        email_stroke = info_stroke;

                        hackerearth_img = info_img;
                        linkedin_img = info_img;
                        github_img = info_img;
                        instagram_img = info_img;
                        twitter_img = info_img;
                        resume_img = info_img;
                        codeforces_img = info_img;
                        hackerrank_img = info_img;
                        email_img = info_img;
                    }


                });

                $('#link-hackerearth').mouseover(function () {
                    hackerearth_fill = hackerearth_colour; hackerearth_stroke = hackerearth_colour; hackerearth_img = hackerearth_img_file;
                });

                $('#link-hackerearth').mouseout(function () {
                    if (info_flag == 1) {
                        hackerearth_fill = info_colour; hackerearth_stroke = info_stroke; hackerearth_img = info_img;
                    }
                });

                $('#link-linkedin').mouseover(function () {
                    linkedin_fill = linkedin_colour; linkedin_stroke = linkedin_colour; linkedin_img = linkedin_img_file;
                });

                $('#link-linkedin').mouseout(function () {
                    if (info_flag == 1) {
                        linkedin_fill = info_colour; linkedin_stroke = info_stroke; linkedin_img = info_img;
                    }
                });

                $('#link-github').mouseover(function () {
                    github_fill = github_colour; github_stroke = github_colour; github_img = github_img_file;
                });

                $('#link-github').mouseout(function () {
                    if (info_flag == 1) {
                        github_fill = info_colour; github_stroke = info_stroke; github_img = info_img;
                    }
                });

                $('#link-instagram').mouseover(function () {
                    instagram_fill = instagram_colour; instagram_stroke = instagram_colour; instagram_img = instagram_img_file;
                });

                $('#link-instagram').mouseout(function () {
                    if (info_flag == 1) {
                        instagram_fill = info_colour; instagram_stroke = info_stroke; instagram_img = info_img;
                    }
                });

                $('#link-twitter').mouseover(function () {
                    twitter_fill = twitter_colour; twitter_stroke = twitter_colour; twitter_img = twitter_img_file;
                });

                $('#link-twitter').mouseout(function () {
                    if (info_flag == 1) {
                        twitter_fill = info_colour; twitter_stroke = info_stroke; twitter_img = info_img;
                    }
                });

                $('#link-resume').mouseover(function () {
                    resume_fill = resume_colour; resume_stroke = resume_colour; resume_img = resume_img_file;
                });

                $('#link-resume').mouseout(function () {
                    if (info_flag == 1) {
                        resume_fill = info_colour; resume_stroke = info_stroke; resume_img = info_img;
                    }
                });

                $('#link-codeforces').mouseover(function () {
                    codeforces_fill = codeforces_colour; codeforces_stroke = codeforces_colour; codeforces_img = codeforces_img_file;
                });

                $('#link-codeforces').mouseout(function () {
                    if (info_flag == 1) {
                        codeforces_fill = info_colour; codeforces_stroke = info_stroke; codeforces_img = info_img;
                    }
                });

                $('#link-hackerrank').mouseover(function () {
                    hackerrank_fill = hackerrank_colour; hackerrank_stroke = hackerrank_colour; hackerrank_img = hackerrank_img_file;
                });

                $('#link-hackerrank').mouseout(function () {
                    if (info_flag == 1) {
                        hackerrank_fill = info_colour; hackerrank_stroke = info_stroke; hackerrank_img = info_img;
                    }
                });

                $('#link-email').mouseover(function () {
                    email_fill = email_colour; email_stroke = email_colour; email_img = email_img_file;
                });

                $('#link-email').mouseout(function () {
                    if (info_flag == 1) {
                        email_fill = info_colour; email_stroke = info_stroke; email_img = info_img;
                    }
                });

                var r = 0;

                $('#gravity-container').click(function () {

                    if (gravity_direction == 0) {

                        gravity_direction = 2;
                        gravity = new b2Vec2(-50, 0.0);
                        world.SetGravity(gravity);

                        // Add Roof

                        user_data = 'roof';

                        add.box({

                            x: 0.5,
                            y: 0.5,

                            height: 1,
                            width: screen_w / 15,

                            color: generateRandomColor(),
                            img_src: 999,
                            isStatic: true

                        });

                        $('#gravity-container').css('transform', 'rotate(' + (r += 90) + 'deg)');

                    }

                    else if (gravity_direction == 1) {

                        gravity_direction = 2;
                        gravity = new b2Vec2(-50, 0.0);
                        world.SetGravity(gravity);

                        $('#gravity-container').css('transform', 'rotate(' + (r += 90) + 'deg)');

                    }
                    else if (gravity_direction == 2) {

                        gravity_direction = 3;
                        gravity = new b2Vec2(0, -50.0);
                        world.SetGravity(gravity);

                        $('#gravity-container').css('transform', 'rotate(' + (r += 90) + 'deg)');

                    }
                    else if (gravity_direction == 3) {

                        gravity_direction = 4;
                        gravity = new b2Vec2(50, 0.0);
                        world.SetGravity(gravity);

                        $('#gravity-container').css('transform', 'rotate(' + (r += 90) + 'deg)');

                    }
                    else {

                        gravity_direction = 1;
                        gravity = new b2Vec2(0, 50.0);
                        world.SetGravity(gravity);

                        $('#gravity-container').css('transform', 'rotate(' + (r += 90) + 'deg)');

                    }

                });

                // Listen for clicks on the canvas....

                canvas.addEventListener('click', function (e) {

                }, false);

            }

        };

        var add = {

            random: function (options) {

                options = options || {};


                if (Math.random() < 0.5) {

                    this.circle(options);

                } else {

                    this.box(options);

                }


                //this.circle(options);
            },

            circle: function (options) {

                options.radius = 1 + Math.random() * base_size;
                var shape = new Circle(options);
                shapes[shape.id] = shape;
                box2d.addToWorld(shape);

            },
            box: function (options) {

                rand_box_size = (Math.random() * 2) + 1.5 * base_size;

                options.width = options.width || rand_box_size;
                options.height = options.height || rand_box_size;

                var shape = new Box(options);
                shapes[shape.id] = shape;
                box2d.addToWorld(shape);

            }

        };

        var box2d = {

            addToWorld: function (shape) {

                var bodyDef = this.create.bodyDef(shape);
                var body = this.create.body(bodyDef);

                if (shape.radius) {
                    this.create.fixtures.circle(body, shape);
                } else {
                    this.create.fixtures.box(body, shape);
                }

            },

            create: {

                world: function () {
                    world = new b2World(
                        new b2Vec2(0, 15)    //gravity
                        , false                 //allow sleep
                    );

                    if (debug) {

                        var debugDraw = new b2DebugDraw();

                        debugDraw.SetSprite(ctx);
                        debugDraw.SetDrawScale(30.0);
                        debugDraw.SetFillAlpha(0.3);
                        debugDraw.SetLineThickness(1.0);
                        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
                        world.SetDebugDraw(debugDraw);

                    }

                },

                defaultFixture: function () {

                    fixDef = new b2FixtureDef;
                    fixDef.density = 1.0;
                    fixDef.friction = 0.5;
                    fixDef.restitution = 0.2;

                },

                bodyDef: function (shape) {

                    var bodyDef = new b2BodyDef;

                    if (shape.isStatic == true) {
                        bodyDef.type = b2Body.b2_staticBody;
                    } else {
                        bodyDef.type = b2Body.b2_dynamicBody;
                    }

                    bodyDef.position.x = shape.x;
                    bodyDef.position.y = shape.y;
                    bodyDef.userData = shape.id;
                    bodyDef.angle = shape.angle;

                    return bodyDef;

                },

                body: function (bodyDef) {
                    return world.CreateBody(bodyDef);
                },

                fixtures: {

                    circle: function (body, shape) {
                        fixDef.shape = new b2CircleShape(shape.radius);
                        body.BoxNumber = user_data;
                        body.CreateFixture(fixDef);
                    },

                    box: function (body, shape) {
                        fixDef.shape = new b2PolygonShape;
                        fixDef.shape.SetAsBox(shape.width / 2, shape.height / 2);
                        body.BoxNumber = user_data;
                        body.CreateFixture(fixDef);
                    }
                }
            },

            get: {

                bodySpec: function (b) {
                    return { x: b.GetPosition().x, y: b.GetPosition().y, angle: b.GetAngle(), center: { x: b.GetWorldCenter().x, y: b.GetWorldCenter().y } };
                }

            }
        };

        var loop = {

            step: function () {

                var stepRate = 1 / 60;

                world.Step(stepRate, 10, 10);
                world.ClearForces();

            },

            update: function () {

                for (var i in destroy_list) {

                    world.DestroyBody(destroy_list[i]);
                    //shapes[destroy_list[i].GetUserData()] = '';
                    delete shapes[destroy_list[i].GetUserData()];

                }

                destroy_list.length = 0;

                for (var b = world.GetBodyList(); b; b = b.m_next) {

                    if (b.IsActive() && typeof b.GetUserData() !== 'undefined' && b.GetUserData() != null) {
                        shapes[b.GetUserData()].update(box2d.get.bodySpec(b));
                    }

                }

                needToDraw = true;

            },

            draw: function () {


                if (!needToDraw) return;

                //console.log('DRAWING');

                if (!debug) ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (var i in shapes) {
                    shapes[i].draw(ctx);
                }
                needToDraw = false;
            }
        };

        var helpers = {

            randomColor: function () {


                var letters = '0123456789ABCDEF'.split(''),
                    color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.round(Math.random() * 15)];
                }


                //var color = '#fff';
                return color;
            }
        };

        /* Shapes down here */

        var Shape = function (v) {

            this.id = Math.round(Math.random() * 1000000);

            random_x = (Math.random() * (screen_w - 300)) + 300;
            random_x = random_x / 30;

            this.x = v.x || random_x - 3;
            this.y = v.y || Math.random() * 30 - 40;

            this.angle = 0;
            this.color = v.color || '#222228';
            this.center = { x: null, y: null };
            this.isStatic = v.isStatic || false;

            this.update = function (options) {
                this.angle = options.angle;
                this.center = options.center;
                this.x = options.x;
                this.y = options.y;
            };
        };

        var Circle = function (options) {

            Shape.call(this, options);
            this.radius = options.radius || 1;

            this.draw = function () {

                ctx.save();
                ctx.translate(this.x * SCALE, this.y * SCALE);
                ctx.rotate(this.angle);
                ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);

                ctx.beginPath();

                ctx.arc(this.x * SCALE, this.y * SCALE, this.radius * SCALE - 4, 0, Math.PI * 2, true);

                ctx.closePath();
                ctx.restore();

                ctx.lineWidth = 1;

                if (info_flag == 1) {

                    ctx.fillStyle = info_fill;
                    ctx.strokeStyle = info_stroke;

                }

                else {

                    ctx.fillStyle = default_colour;
                    ctx.strokeStyle = default_stroke;

                }

                ctx.fill();
                ctx.stroke();
            };

        };

        Circle.prototype = Shape;

        var Box = function (options) {

            var img = null;

            Shape.call(this, options);

            this.width = options.width || 1.5;
            this.height = options.height || 1.5;
            this.img_src = options.img_src;

            this.draw = function () {

                ctx.save();
                ctx.translate(this.x * SCALE, this.y * SCALE);
                ctx.rotate(this.angle);
                ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);


                // hackerearth Studios

                if (this.img_src == hackerearth_number) {

                    ctx.fillStyle = hackerearth_fill;
                    ctx.strokeStyle = hackerearth_stroke;

                    img = hackerearth_img;

                }

                // linkedin

                else if (this.img_src == linkedin_number) {

                    ctx.fillStyle = linkedin_fill;
                    ctx.strokeStyle = linkedin_stroke;
                    img = linkedin_img;

                }

                // github

                else if (this.img_src == github_number) {

                    ctx.fillStyle = github_fill;
                    ctx.strokeStyle = github_stroke;
                    img = github_img;

                }

                // Instagram

                else if (this.img_src == instagram_number) {

                    ctx.fillStyle = instagram_fill;
                    ctx.strokeStyle = instagram_stroke;
                    img = instagram_img;

                }

                // Twitter

                else if (this.img_src == twitter_number) {

                    ctx.fillStyle = twitter_fill;
                    ctx.strokeStyle = twitter_stroke;
                    img = twitter_img;

                }

                // resume

                else if (this.img_src == resume_number) {

                    ctx.fillStyle = resume_fill;
                    ctx.strokeStyle = resume_stroke;
                    img = resume_img;

                }

                // codeforces

                else if (this.img_src == codeforces_number) {

                    ctx.fillStyle = codeforces_fill;
                    ctx.strokeStyle = codeforces_stroke;
                    img = codeforces_img;

                }

                // hackerrank

                else if (this.img_src == hackerrank_number) {

                    ctx.fillStyle = hackerrank_fill;
                    ctx.strokeStyle = hackerrank_stroke;
                    img = hackerrank_img;

                }

                // Email

                else if (this.img_src == email_number) {

                    ctx.fillStyle = email_fill;
                    ctx.strokeStyle = email_stroke;
                    img = email_img;

                }




                else {

                    img = null;

                    if (info_flag == 1) {

                        ctx.fillStyle = info_fill;
                        ctx.strokeStyle = info_stroke;

                    }

                    else {

                        if (this.img_src !== 999) {

                            ctx.fillStyle = default_colour;
                            ctx.strokeStyle = default_stroke;

                        }
                        else {

                            ctx.fillStyle = background_fill;
                            ctx.strokeStyle = background_stroke;

                        }

                    }

                }

                // Stroke and fill rectangle (if it's not furniture)...

                if (this.img_src !== 999) {


                    ctx.fillRect(

                        (this.x - (this.width / 2)) * SCALE + 5,
                        (this.y - (this.height / 2)) * SCALE + 5,

                        this.width * SCALE - 10,
                        this.height * SCALE - 10

                    );

                    ctx.lineWidth = 1;
                    ctx.strokeRect(

                        (this.x - (this.width / 2)) * SCALE + 5,
                        (this.y - (this.height / 2)) * SCALE + 5,
                        this.width * SCALE - 10,
                        this.height * SCALE - 10

                    );

                };

                // Add image (if not firefox or there is no image)...

                if (!is_firefox && (img != null)) {

                    ctx.drawImage(

                        img,
                        (this.x - (this.width / 2)) * SCALE + 5,
                        (this.y - (this.height / 2)) * SCALE + 5,
                        this.width * SCALE - 10,
                        this.height * SCALE - 10

                    );

                }

                ctx.restore();

            };

        };

        Box.prototype = Shape;


        init.start('canvas-body');


        // Mouse events...

        var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
        var canvasPosition = getElementPosition(document.getElementById("canvas-body"));
        var canvasID = document.getElementById("canvas-body");

        canvasID.addEventListener("mousedown", function (e) {

            isMouseDown = true;
            //handleMouseMove(e);

            //canvasID.addEventListener("mousemove", handleMouseMove, true);

            //console.log('MouseDown');

            body = getBodyAtMouse();

            if (selectedBody != null) {

                console.log(selectedBody.BoxNumber);

                // If it is a social box...

                if (selectedBody.BoxNumber == linkedin_number) {

                    window.open('https://www.linkedin.com/in/umangajw/', '_blank');
                }
                else if (selectedBody.BoxNumber == hackerearth_number) {

                    window.open('https://www.hackerearth.com/@umangajw/', '_blank');
                }
                else if (selectedBody.BoxNumber == github_number) {

                    window.open('https://github.com/UmangAjw', '_blank');
                }
                else if (selectedBody.BoxNumber == hackerrank_number) {

                    window.open('https://www.hackerrank.com/umangajw/', '_blank');
                }
                else if (selectedBody.BoxNumber == codeforces_number) {

                    window.open('https://codeforces.com/profile/UmangAjw', '_blank');
                }
                else if (selectedBody.BoxNumber == instagram_number) {

                    window.open('https://instagram.com/umangajw', '_blank');
                }
                else if (selectedBody.BoxNumber == twitter_number) {

                    window.open('https://twitter.com/UAjwalia', '_blank');
                }
                else if (selectedBody.BoxNumber == email_number) {

                    window.open('mailto:umangajw@gmail.com');
                }

                // If it is not a social box, make it move...

                else {

                    if (gravity_direction == 0) {

                        // Add a roof...

                        user_data = 'roof';

                        add.box({

                            x: 0.5,
                            y: 0.5,

                            height: 1,
                            width: screen_w / 15,

                            color: generateRandomColor(),
                            img_src: 999,
                            isStatic: true

                        });

                        selectedBody.ApplyImpulse({ x: 0, y: -300 }, body.GetWorldCenter());

                        gravity_direction = 1;

                    }

                    else if (gravity_direction == 1) {

                        selectedBody.ApplyImpulse({ x: 0, y: -300 }, body.GetWorldCenter());
                    }

                    else if (gravity_direction == 2) {

                        selectedBody.ApplyImpulse({ x: 300, y: 0 }, body.GetWorldCenter());
                    }
                    else if (gravity_direction == 3) {

                        selectedBody.ApplyImpulse({ x: 0, y: 300 }, body.GetWorldCenter());
                    }
                    else if (gravity_direction == 4) {

                        selectedBody.ApplyImpulse({ x: -300, y: 0 }, body.GetWorldCenter());
                    }
                }

            }
            else {

                console.log('No Hit');
            }

        }, true);

        /*     
        
        canvasID.addEventListener("mouseup", function() {
        
            canvasID.removeEventListener("mousemove", handleMouseMove, true);
            
            isMouseDown = false;
            mouseX = undefined;
            mouseY = undefined;
    
        }, true);
        
        */

        canvasID.addEventListener("mousemove", handleMouseMove, true);

        function handleMouseMove(e) {
            mouseX = (e.clientX - canvasPosition.x) / 30;
            mouseY = (e.clientY - canvasPosition.y) / 30;

            body = getBodyAtMouse();

            if (selectedBody != null) {

                document.body.style.cursor = 'pointer';

                if (selectedBody.BoxNumber == hackerearth_number) {

                    console.log('hackerearth Studios');

                    hackerearth_fill = hackerearth_colour; hackerearth_stroke = hackerearth_colour; hackerearth_img = hackerearth_img_file;

                    // Reset everything else...

                    linkedin_fill = default_fill; linkedin_stroke = default_stroke; linkedin_img = default_img;
                    github_fill = default_fill; github_stroke = default_stroke; github_img = default_img;
                    instagram_fill = default_fill; instagram_stroke = default_stroke; instagram_img = default_img;
                    twitter_fill = default_fill; twitter_stroke = default_stroke; twitter_img = default_img;
                    resume_fill = default_fill; resume_stroke = default_stroke; resume_img = default_img;
                    codeforces_fill = default_fill; codeforces_stroke = default_stroke; codeforces_img = default_img;
                    hackerrank_fill = default_fill; hackerrank_stroke = default_stroke; hackerrank_img = default_img;
                    email_fill = default_fill; email_stroke = default_stroke; email_img = default_img;

                }

                else if (selectedBody.BoxNumber == linkedin_number) {

                    console.log('linkedin');

                    linkedin_fill = linkedin_colour; linkedin_stroke = linkedin_colour; linkedin_img = linkedin_img_file;

                    // Reset everything else...

                    hackerearth_fill = default_fill; hackerearth_stroke = default_stroke; hackerearth_img = default_img;
                    github_fill = default_fill; github_stroke = default_stroke; github_img = default_img;
                    instagram_fill = default_fill; instagram_stroke = default_stroke; instagram_img = default_img;
                    twitter_fill = default_fill; twitter_stroke = default_stroke; twitter_img = default_img;
                    resume_fill = default_fill; resume_stroke = default_stroke; resume_img = default_img;
                    codeforces_fill = default_fill; codeforces_stroke = default_stroke; codeforces_img = default_img;
                    hackerrank_fill = default_fill; hackerrank_stroke = default_stroke; hackerrank_img = default_img;
                    email_fill = default_fill; email_stroke = default_stroke; email_img = default_img;

                }

                else if (selectedBody.BoxNumber == github_number) {

                    console.log('github');

                    github_fill = github_colour; github_stroke = github_colour; github_img = github_img_file;

                    // Reset everything else...

                    linkedin_fill = default_fill; linkedin_stroke = default_stroke; linkedin_img = default_img;
                    hackerearth_fill = default_fill; hackerearth_stroke = default_stroke; hackerearth_img = default_img;
                    //github_fill = default_fill;  github_stroke = default_stroke;  github_img = default_img;
                    instagram_fill = default_fill; instagram_stroke = default_stroke; instagram_img = default_img;
                    twitter_fill = default_fill; twitter_stroke = default_stroke; twitter_img = default_img;
                    resume_fill = default_fill; resume_stroke = default_stroke; resume_img = default_img;
                    codeforces_fill = default_fill; codeforces_stroke = default_stroke; codeforces_img = default_img;
                    hackerrank_fill = default_fill; hackerrank_stroke = default_stroke; hackerrank_img = default_img;
                    email_fill = default_fill; email_stroke = default_stroke; email_img = default_img;

                }


                else if (selectedBody.BoxNumber == instagram_number) {

                    console.log('Instagram');

                    instagram_fill = instagram_colour; instagram_stroke = instagram_colour; instagram_img = instagram_img_file;

                    // Reset everything else...

                    linkedin_fill = default_fill; linkedin_stroke = default_stroke; linkedin_img = default_img;
                    hackerearth_fill = default_fill; hackerearth_stroke = default_stroke; hackerearth_img = default_img;
                    github_fill = default_fill; github_stroke = default_stroke; github_img = default_img;
                    //instagram_fill = default_fill;  instagram_stroke = default_stroke;  instagram_img = default_img;
                    twitter_fill = default_fill; twitter_stroke = default_stroke; twitter_img = default_img;
                    resume_fill = default_fill; resume_stroke = default_stroke; resume_img = default_img;
                    codeforces_fill = default_fill; codeforces_stroke = default_stroke; codeforces_img = default_img;
                    hackerrank_fill = default_fill; hackerrank_stroke = default_stroke; hackerrank_img = default_img;
                    email_fill = default_fill; email_stroke = default_stroke; email_img = default_img;

                }

                else if (selectedBody.BoxNumber == twitter_number) {

                    console.log('Twitter');

                    twitter_fill = twitter_colour; twitter_stroke = twitter_colour; twitter_img = twitter_img_file;

                    // Reset everything else...

                    linkedin_fill = default_fill; linkedin_stroke = default_stroke; linkedin_img = default_img;
                    hackerearth_fill = default_fill; hackerearth_stroke = default_stroke; hackerearth_img = default_img;
                    github_fill = default_fill; github_stroke = default_stroke; github_img = default_img;
                    instagram_fill = default_fill; instagram_stroke = default_stroke; instagram_img = default_img;
                    //twitter_fill = default_fill;  twitter_stroke = default_stroke;  twitter_img = default_img;
                    resume_fill = default_fill; resume_stroke = default_stroke; resume_img = default_img;
                    codeforces_fill = default_fill; codeforces_stroke = default_stroke; codeforces_img = default_img;
                    hackerrank_fill = default_fill; hackerrank_stroke = default_stroke; hackerrank_img = default_img;
                    email_fill = default_fill; email_stroke = default_stroke; email_img = default_img;

                }

                else if (selectedBody.BoxNumber == resume_number) {

                    console.log('resume');

                    resume_fill = resume_colour; resume_stroke = resume_colour; resume_img = resume_img_file;

                    // Reset everything else...

                    linkedin_fill = default_fill; linkedin_stroke = default_stroke; linkedin_img = default_img;
                    hackerearth_fill = default_fill; hackerearth_stroke = default_stroke; hackerearth_img = default_img;
                    github_fill = default_fill; github_stroke = default_stroke; github_img = default_img;
                    instagram_fill = default_fill; instagram_stroke = default_stroke; instagram_img = default_img;
                    twitter_fill = default_fill; twitter_stroke = default_stroke; twitter_img = default_img;
                    //resume_fill = default_fill;  resume_stroke = default_stroke;  resume_img = default_img;
                    codeforces_fill = default_fill; codeforces_stroke = default_stroke; codeforces_img = default_img;
                    hackerrank_fill = default_fill; hackerrank_stroke = default_stroke; hackerrank_img = default_img;
                    email_fill = default_fill; email_stroke = default_stroke; email_img = default_img;

                }

                else if (selectedBody.BoxNumber == codeforces_number) {

                    console.log('codeforces');

                    codeforces_fill = codeforces_colour; codeforces_stroke = codeforces_colour; codeforces_img = codeforces_img_file;

                    // Reset everything else...

                    linkedin_fill = default_fill; linkedin_stroke = default_stroke; linkedin_img = default_img;
                    hackerearth_fill = default_fill; hackerearth_stroke = default_stroke; hackerearth_img = default_img;
                    github_fill = default_fill; github_stroke = default_stroke; github_img = default_img;
                    instagram_fill = default_fill; instagram_stroke = default_stroke; instagram_img = default_img;
                    twitter_fill = default_fill; twitter_stroke = default_stroke; twitter_img = default_img;
                    resume_fill = default_fill; resume_stroke = default_stroke; resume_img = default_img;
                    //codeforces_fill = default_fill;  codeforces_stroke = default_stroke;  codeforces_img = default_img;
                    hackerrank_fill = default_fill; hackerrank_stroke = default_stroke; hackerrank_img = default_img;
                    email_fill = default_fill; email_stroke = default_stroke; email_img = default_img;

                }

                else if (selectedBody.BoxNumber == hackerrank_number) {

                    console.log('hackerrank');

                    hackerrank_fill = hackerrank_colour; hackerrank_stroke = hackerrank_colour; hackerrank_img = hackerrank_img_file;

                    // Reset everything else...

                    linkedin_fill = default_fill; linkedin_stroke = default_stroke; linkedin_img = default_img;
                    hackerearth_fill = default_fill; hackerearth_stroke = default_stroke; hackerearth_img = default_img;
                    github_fill = default_fill; github_stroke = default_stroke; github_img = default_img;
                    instagram_fill = default_fill; instagram_stroke = default_stroke; instagram_img = default_img;
                    twitter_fill = default_fill; twitter_stroke = default_stroke; twitter_img = default_img;
                    resume_fill = default_fill; resume_stroke = default_stroke; resume_img = default_img;
                    codeforces_fill = default_fill; codeforces_stroke = default_stroke; codeforces_img = default_img;
                    //hackerrank_fill = default_fill;  hackerrank_stroke = default_stroke;  hackerrank_img = default_img;
                    email_fill = default_fill; email_stroke = default_stroke; email_img = default_img;

                }

                else if (selectedBody.BoxNumber == email_number) {

                    console.log('Email');

                    email_fill = email_colour; email_stroke = email_colour; email_img = email_img_file;

                    // Reset everything else...

                    linkedin_fill = default_fill; linkedin_stroke = default_stroke; linkedin_img = default_img;
                    hackerearth_fill = default_fill; hackerearth_stroke = default_stroke; hackerearth_img = default_img;
                    github_fill = default_fill; github_stroke = default_stroke; github_img = default_img;
                    instagram_fill = default_fill; instagram_stroke = default_stroke; instagram_img = default_img;
                    twitter_fill = default_fill; twitter_stroke = default_stroke; twitter_img = default_img;
                    resume_fill = default_fill; resume_stroke = default_stroke; resume_img = default_img;
                    codeforces_fill = default_fill; codeforces_stroke = default_stroke; codeforces_img = default_img;
                    hackerrank_fill = default_fill; hackerrank_stroke = default_stroke; hackerrank_img = default_img;
                    //email_fill = default_fill;  email_stroke = default_stroke;  email_img = default_img;

                }
                else {

                    // Reset everything...

                    linkedin_fill = default_fill; linkedin_stroke = default_stroke; linkedin_img = default_img;
                    hackerearth_fill = default_fill; hackerearth_stroke = default_stroke; hackerearth_img = default_img;
                    github_fill = default_fill; github_stroke = default_stroke; github_img = default_img;
                    instagram_fill = default_fill; instagram_stroke = default_stroke; instagram_img = default_img;
                    twitter_fill = default_fill; twitter_stroke = default_stroke; twitter_img = default_img;
                    resume_fill = default_fill; resume_stroke = default_stroke; resume_img = default_img;
                    codeforces_fill = default_fill; codeforces_stroke = default_stroke; codeforces_img = default_img;
                    hackerrank_fill = default_fill; hackerrank_stroke = default_stroke; hackerrank_img = default_img;
                    email_fill = default_fill; email_stroke = default_stroke; email_img = default_img;

                }

                console.log(selectedBody.BoxNumber);

            }
            else {

                document.body.style.cursor = 'default';

                // Reset everything...

                linkedin_fill = default_fill; linkedin_stroke = default_stroke; linkedin_img = default_img;
                hackerearth_fill = default_fill; hackerearth_stroke = default_stroke; hackerearth_img = default_img;
                github_fill = default_fill; github_stroke = default_stroke; github_img = default_img;
                instagram_fill = default_fill; instagram_stroke = default_stroke; instagram_img = default_img;
                twitter_fill = default_fill; twitter_stroke = default_stroke; twitter_img = default_img;
                resume_fill = default_fill; resume_stroke = default_stroke; resume_img = default_img;
                codeforces_fill = default_fill; codeforces_stroke = default_stroke; codeforces_img = default_img;
                hackerrank_fill = default_fill; hackerrank_stroke = default_stroke; hackerrank_img = default_img;
                email_fill = default_fill; email_stroke = default_stroke; email_img = default_img;

            }

        };

        function getBodyAtMouse() {

            mousePVec = new b2Vec2(mouseX, mouseY);
            var aabb = new b2AABB();
            aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
            aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);

            // Query the world for overlapping shapes.
            selectedBody = null;
            world.QueryAABB(getBodyCB, aabb);

            return selectedBody;

        }

        function getBodyCB(fixture) {

            if (fixture.GetBody().GetType() != b2Body.b2_staticBody) {
                if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
                    selectedBody = fixture.GetBody();
                    return false;
                }
            }

            return true;

        }

        function getElementPosition(element) {

            var elem = element, tagname = "", x = 0, y = 0;

            while ((typeof (elem) == "object") && (typeof (elem.tagName) != "undefined")) {

                y += elem.offsetTop;
                x += elem.offsetLeft;
                tagname = elem.tagName.toUpperCase();

                if (tagname == "BODY")
                    elem = 0;

                if (typeof (elem) == "object") {
                    if (typeof (elem.offsetParent) == "object")
                        elem = elem.offsetParent;
                }
            }

            return { x: x, y: y };

        }


        function generateRandomColor() {


            var letters = '0123456789ABCDEF'.split(''), color = '#';

            for (var i = 0; i < 6; i++) {
                color += letters[Math.round(Math.random() * 15)];
            }

            return color;

        }


        // Gravity for ipad / iphone..


        var x = 0, y = 0, vx = 0, vy = 0, ax = 0, ay = 0;

        window.setTimeout(mobileGravity, 3500);

        function mobileGravity() {

            $('#gravity-container').addClass('show');

            if (window.DeviceMotionEvent != undefined) {

                console.log('Device Motion');

                window.ondevicemotion = function (e) {

                    //ay = event.accelerationIncludingGravity.y * 5;
                    //ax = event.accelerationIncludingGravity.x * 5;

                    if (window.orientation == 90) {

                        gravity_multiplier = -10;
                        //document.getElementById("orientation").innerHTML = '90';
                        gravity = new b2Vec2((e.accelerationIncludingGravity.y * gravity_multiplier), 15);
                        world.SetGravity(gravity);
                        degrees = e.accelerationIncludingGravity.y * gravity_multiplier * -5;;

                    }
                    else if (window.orientation == 180) {

                        gravity_multiplier = -10;
                        //document.getElementById("orientation").innerHTML = '180';
                        gravity = new b2Vec2((e.accelerationIncludingGravity.x * gravity_multiplier), 15);
                        world.SetGravity(gravity);
                        degrees = e.accelerationIncludingGravity.x * gravity_multiplier * -5;

                    }
                    else if (window.orientation == -90) {

                        gravity_multiplier = 10;
                        //document.getElementById("orientation").innerHTML = '-90';
                        gravity = new b2Vec2((e.accelerationIncludingGravity.y * gravity_multiplier), 15);
                        world.SetGravity(gravity);
                        degrees = e.accelerationIncludingGravity.y * gravity_multiplier * -5;

                    }
                    else {

                        gravity_multiplier = 10;
                        //document.getElementById("orientation").innerHTML = '0';
                        gravity = new b2Vec2((e.accelerationIncludingGravity.x * gravity_multiplier), 15);
                        world.SetGravity(gravity);
                        degrees = e.accelerationIncludingGravity.x * gravity_multiplier * -5;
                    }

                    if (degrees < -90) { degrees = -90; }

                    else if (degrees > 90) { degrees = 90; }

                    if (degrees != 0) {

                        $("#gravity-container").css({
                            '-webkit-transform': 'rotate(' + degrees + 'deg)',
                            '-moz-transform': 'rotate(' + degrees + 'deg)',
                            '-ms-transform': 'rotate(' + degrees + 'deg)',
                            'transform': 'rotate(' + degrees + 'deg)'
                        });
                    }
                }
            }
        }

    })();

}