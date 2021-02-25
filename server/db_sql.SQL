-- Table: public.permissions_groups
DROP TABLE IF EXISTS public.permissions_groups CASCADE;
CREATE TABLE public.permissions_groups
(
    id serial NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    blockade boolean DEFAULT false,
	creator integer,
    CONSTRAINT permissions_groups_pkey PRIMARY KEY (id),
    CONSTRAINT permissions_groups_id_key UNIQUE (id),
    CONSTRAINT permissions_groups_creator_fkey FOREIGN KEY (creator)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE SET NULL
        ON DELETE SET NULL
)

-- Table: public.permissions_modules
DROP TABLE IF EXISTS public.permissions_modules CASCADE;
CREATE TABLE public.permissions_modules
(
    id serial NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
	component character varying(100) COLLATE pg_catalog."default" NOT NULL,
    icon character varying(30) COLLATE pg_catalog."default" DEFAULT ''::character varying,
	disabled boolean DEFAULT false,
    CONSTRAINT modules_pkey PRIMARY KEY (id),
    CONSTRAINT modules_id_key UNIQUE (id)
)

-- Table: public.users
DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE public.users
(
    id serial NOT NULL,
    username character varying(20) COLLATE pg_catalog."default" NOT NULL,
    email character varying(40) COLLATE pg_catalog."default" NOT NULL,
    password character varying(30) COLLATE pg_catalog."default" NOT NULL,
    language character varying(10) COLLATE pg_catalog."default" DEFAULT 'en'::character varying,
    created timestamp(6) with time zone DEFAULT now(),
	logged timestamp(6) with time zone DEFAULT now(),
	forename character varying(40) COLLATE pg_catalog."default" NOT NULL,
    lastname character varying(40) COLLATE pg_catalog."default" NOT NULL,
	phone character varying(12) COLLATE pg_catalog."default" DEFAULT ''::character varying,
	active boolean DEFAULT true,
    "group" integer DEFAULT 2,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_id_key UNIQUE (id),
    CONSTRAINT users_username_key UNIQUE (username),
    CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_group_fkey FOREIGN KEY ("group")
        REFERENCES public.permissions_groups (id) MATCH SIMPLE
        ON UPDATE SET DEFAULT
        ON DELETE SET DEFAULT
)

-- Table: public.notifications
DROP TABLE IF EXISTS public.notifications CASCADE;
CREATE TABLE public.notifications
(
    id serial NOT NULL,
    creator integer DEFAULT 0,
    created timestamp(6) with time zone DEFAULT now(),
    content character varying(50) COLLATE pg_catalog."default" DEFAULT ''::character varying,
	subject character varying(50) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    receiver integer DEFAULT 0,
    important boolean DEFAULT false,
	read boolean DEFAULT false,
    CONSTRAINT notifications_pkey PRIMARY KEY (id),
    CONSTRAINT notifications_id_key UNIQUE (id)
)

-- Table: public.users_settings
DROP TABLE IF EXISTS public.users_settings CASCADE;
CREATE TABLE public.users_settings
(
    id integer NOT NULL,
    theme character varying(20) COLLATE pg_catalog."default" DEFAULT 'theme-light'::character varying,
    wallpaper character varying(30) COLLATE pg_catalog."default" DEFAULT 'none'::character varying,
    CONSTRAINT users_settings_id_fkey FOREIGN KEY (id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

-- Table: public.clients
DROP TABLE IF EXISTS public.clients CASCADE;
CREATE TABLE public.clients
(
    id serial NOT NULL,
    forename character varying(40) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    lastname character varying(40) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    address character varying(80) COLLATE pg_catalog."default" NOT NULL DEFAULT ''::character varying,
    phone character varying(12) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    email character varying(40) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    creator integer DEFAULT 0,
    created timestamp(6) with time zone DEFAULT now(),
	type character varying(20) COLLATE pg_catalog."default" DEFAULT 'person'::character varying,
	status character varying(20) COLLATE pg_catalog."default" DEFAULT 'active'::character varying,
	pesel character varying(11) COLLATE pg_catalog."default" DEFAULT ''::character varying,
	note character varying(100) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    CONSTRAINT clients_pkey PRIMARY KEY (id),
    CONSTRAINT clients_id_key UNIQUE (id)
)

-- Table: public.tickets
DROP TABLE IF EXISTS public.tickets CASCADE;
CREATE TABLE public.tickets
(
    id serial NOT NULL,
    client integer NOT NULL,
    creator integer DEFAULT 0,
    created time(6) with time zone DEFAULT now(),
    status character varying(20) COLLATE pg_catalog."default" DEFAULT 'order'::character varying,
    priority smallint DEFAULT 2,
    category character varying(30) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    payment numeric(10,2) DEFAULT 0.00,
    starting timestamp(6) with time zone DEFAULT now(),
    ending timestamp(6) with time zone DEFAULT now(),
    description1 character varying(50) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    description2 character varying(50) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    description3 character varying(50) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    note character varying(50) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    employees character varying(50) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    CONSTRAINT tickets_pkey PRIMARY KEY (id),
    CONSTRAINT tickets_id_key UNIQUE (id)
)

-- Table: public.calendar
DROP TABLE IF EXISTS public.calendar CASCADE;
CREATE TABLE public.calendar
(
    id serial NOT NULL,
    note character varying(50) COLLATE pg_catalog."default" DEFAULT ''::character varying,
    type character varying(20) COLLATE pg_catalog."default" DEFAULT 'other'::character varying,
    ticket integer DEFAULT 0,
    creator integer DEFAULT 0,
    starting timestamp(6) with time zone DEFAULT now(),
    ending timestamp(6) with time zone DEFAULT now(),
    CONSTRAINT calendar_pkey PRIMARY KEY (id),
    CONSTRAINT calendar_id_key UNIQUE (id)

)

-- Table: public.permissions
DROP TABLE IF EXISTS public.permissions CASCADE;
CREATE TABLE public.permissions
(
    id serial NOT NULL,
    "group" integer NOT NULL,
    module integer NOT NULL,
    action character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT permissions_pkey PRIMARY KEY (id),
    CONSTRAINT permissions_id_key UNIQUE (id),
    CONSTRAINT permissions_group_fkey FOREIGN KEY ("group")
        REFERENCES public.permissions_groups (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT permissions_module_fkey FOREIGN KEY (module)
        REFERENCES public.permissions_modules (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)



-- INSERTS:
INSERT INTO permissions_groups (name, blockade) VALUES
	('admin', true),
	('standard', true);

INSERT INTO permissions_modules (name, component, icon) VALUES
	('Admin', 'AdminPage', 'star'),
	('Users', 'UsersPage', 'people'),
	('Notifications', 'NotificationsPage', 'notifications'),
	('Clients', 'ClientsPage', 'people'),
	('Tickets', 'TicketsPage', 'list-box'),
	('Calendar', 'CalendarPage', 'calendar'),
	('Notebook', 'NotebookPage', 'clipboard'),
	('Messages', 'MessagesPage', 'chatbubbles'),
	('Permissions', 'PermissionsPage', 'lock'),
	('Analitycs', 'AnalyticsPage', 'stats'),
	('Settings', 'SettingsPage', 'settings');

INSERT INTO users (username, email, password, language, forename, lastname, group) VALUES
	('stsw133', 'karolstaszewski96@o2.pl', '123123123', 'en', 'Karol', 'Staszewski', 1);

INSERT INTO users_settings (id, theme) VALUES
	((SELECT id FROM users WHERE username='stsw133'), 'theme-default');

INSERT INTO clients (forename, lastname, address, creator) VALUES
	('Patryk', 'Makowski', 'jakisAdres', (SELECT id FROM users WHERE username='stsw133')),
	('Adam', 'Kicior', 'jakisAdres', (SELECT id FROM users WHERE username='stsw133')),
	('Arkadiusz', 'Bryska', 'jakisAdres', (SELECT id FROM users WHERE username='stsw133')),
	('Szymon', 'Sałamacha', 'jakisAdres', (SELECT id FROM users WHERE username='stsw133')),
	('Mateusz', 'Głowski', 'jakisAdres', (SELECT id FROM users WHERE username='stsw133')),
	('Jakub', 'Ulkowski', 'jakisAdres', (SELECT id FROM users WHERE username='stsw133'));
