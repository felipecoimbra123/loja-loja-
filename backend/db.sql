create database loja_loja;
use loja_loja;

create table users (
	id int primary key auto_increment,
	first_name varchar(45) not null,
    family_name varchar(45) not null,
    email varchar(45) not null unique,
    password varchar(45) not null,
    cpf char(11) not null,
    role enum("A", "U") default "U",
    image varchar(255),
	created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

INSERT INTO users(first_name, family_name, email, password, cpf, role)
VALUES("Bruno", "Nunes", "bruno@email.com", "admin123", "12345678910", "A"),
("Felipe", "Coimbra Rocha dos Santos", "felipe@email.com", "senha123", "10987654321", "A"),
("Leonardo", "Falcão de Matos", "leo@email.com", "password", "12312312312", "A");

INSERT INTO users(first_name, family_name, email, password, cpf)
VALUES ("Sandro", "da Silva", "sandro@email.com", "123123", "11111111111"),
("Eduarda", "da Rosa", "duda@email.com", "123123", "11111111112"),
("Renato", "Rocha", "renato@email.com", "123123", "11111111113"),
("Victoria", "Menezes", "vivi@email.com", "123123", "11111111114"),
("Ramon", "Dino", "dino@email.com", "123123", "11111111115"),
("Christopher", "Bumstead", "cbum@email.com", "123123", "11111111116"),
("José", "Ensinos", "ze@email.com", "123123", "11111111117"),
("Gustavo", "Nascimento", "gugu@email.com", "123123", "11111111118"),
("Henrique", "Calculus", "henri@email.com", "123123", "11111111119"),
("Gabriel", "da Silva", "gabi@email.com", "123123", "11111111110"),
("Charles", "Baltazar", "chacha@email.com", "123123", "11111111121"),
("Francisco", "da Silveira", "francisco@email.com", "123123", "11111111131"),
("Joaquim", "Manolo", "joaquim@email.com", "123123", "11111111141"),
("Amanda", "Ferreira", "mandita@email.com", "123123", "11111111151"),
("Sandra", "Rossa", "sandra@email.com", "123123", "11111111161"),
("Rodolfo", "Marcio", "rodolfo@email.com", "123123", "11111111171"),
("Isabele", "Scholl", "isal@email.com", "123123", "11111111181"),
("Miguel", "Jefferson", "migs@email.com", "123123", "11111111191"),
("Amanda", "Luísa", "amanda@email.com", "123123", "11111111101"),
("Letícia", "da Rosa", "lets@email.com", "123123", "11111111211"),
("Marcia", "Nunes", "marcia@email.com", "123123", "11111111331"),
("Arthur", "Ferreira", "arthur@email.com", "123123", "11111111431"),
("Maria", "Paula", "mp@email.com", "123123", "11111111531"),
("Letícia", "Lisboa", "leticia@email.com", "123123", "11111111631"),
("Ricardo", "da Silveira", "rick@email.com", "123123", "11111118731"),
("Cláudia", "Meneguel", "claudia@email.com", "123123", "11111119731"),
("Bartolomeu", "Allen", "bart@email.com", "123123", "11111110731"),
("Elsa", "Frozen", "elsa@email.com", "123123", "11111112731"),
("Jesus", "Cristo", "jc@email.com", "123123", "11111113731"),
("Junior", "Barreiras", "junior@email.com", "123123", "11111114731"),
("Leonidas", "da Silveira", "leon@email.com", "123123", "11111115731"),
("Pietro", "Mancinni", "pietro@email.com", "123123", "21111111731"),
("Robson", "Paralelo", "robson@email.com", "123123", "31111111731");

create table orders (
	id int primary key auto_increment,
    id_users int not null,
    payment_metod varchar(45) not null,
    shipping_postcode varchar(8) not null,
    house_number varchar(20) not null,
    created_at timestamp default current_timestamp,
    foreign key (id_users) references users(id) on delete cascade
);

create table products (
	id int primary key auto_increment,
    name varchar(45) not null,
    description varchar(255) not null,
    price decimal(6,2) not null,
    promotional_price decimal(6,2),
	stock_quantity int not null,
    image varchar(255),
	created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

insert into products(name, description, price, promotional_price, stock_quantity, image)
values("Aperto de mão aleatório", "Aperto de mão de uma pessoa aleatória. A mesma vai até o endereço de sua casa e aperta a sua mão.", 14.99, null, 28, "aperto-de-mao-aleatorio.jpg"),
	("Unhas de anão", "Unhas de um anão. Obs: Esse anão não é apenas um ser humano baixo, mas um ser mitológico!", 8.99, 5.99, 105, "unhas-de-anao.png"),
    ("Nada", "Unidades exclusivas de Nada™️. Contém a ausência de todas as coisas.", 159.99, null, 0, "nada.png"),
    ("Frases motivacionais", "Frases motivacionais vindo de uma pessoa aleatória. Caso você queira reouvir, deve gravar a fala.", 17.99, 6.99, 13, "frases-motivacionais.webp"),
    ("Plano cartesiano", "Um conceito de plano cartesiano, para esfregar na cara do professor que você sabe sobre o assunto.", 59.99, null, 8, "plano-cartesiano.webp"),
    ("Teorema de Pitágoras", "A patente do conceito do Teorema de Pitágora. Obs: Não é possível comprar apenas a hipotenusa.", 59.99, null, 0, "teorema-de-pitagoras.webp"),
    ("'Indo ali' esmagado", "O famoso personagem 'Indo Ali', porém esmagado.", 299.99, 249.99, 3, "indo-ali-esmagado.jpg"),
    ("Careca", "Uma careca. Só a careca (pessoa não inclusa).", 249.99, 199.99, 14, "careca.jpeg"),
    ("Rosa choque", "A cor rosa, porém muito chocante!", 149.99, null, 1, "rosa-choque.png"),
    ("Salada de chupeta", "Uma salada feita com os melhores alimentos possíveis. Ideal para seu filho e para você!", 17.99, 14.99, 104, "salada-de-chupetas.png"),
    ("Nerd 🤓", "Seja para jogar RPG ou ajudar em um trabalho, um nerd (emoji) pode ser sempre um bom companheiro.", 34.99, 24.99, 37, "nerd.jpg"),
    ("Garantia de compra", "Não é ruim quando você faz uma compra e tem medo de que ela não se concretize? Compre agora uma Garantia de Compra, com os melhores benefícios.", 24.99, null, 239, "garantia-de-compra.webp"),
    ("Entupidor de nariz", "Você é o único entre seus amigos que não tem rinite? Seus problemas acabaram!", 54.99, 39.99, 239, "entupidor-de-nariz.webp"),
    ("Trailer da música 'Thriller'", "Trailer de uma das mais famosas músicas do cantor Michael Jackson. Obs: Música não inclusa.", 499.99, null, 1, "thriller.jpg"),
    ("Bruno Emo", "O mais famoso (e lindo) de todos: Bruno Emo™️.", 999.99, null, 1, "bruno-emo.jpg"),
    ("Susto", "Um susto, escondido dentro de uma caixa a escolha. A pessoa que abrir terá uma surpresa.", 14.99, null, 36, "susto.png"),
    ("Pílula de Dilema", "Ao tomar essa pílula, você vive um dilema moral, como o Dilema do Trem.", 94.99, 69.99, 71, "pilula-dilema.jpeg"),
    ("Pílula de Aula de Filosofia e Sociologia", "Você faltou a aula de Filosofia e Sociologia? Não tem problema, veja a aula através desses maravilhosos remédios.", 34.99, null, 0, "pilula-filosofia-sociologia.jpeg"),
    ("Sopro do Norte", "Um vento gélido. Vindo dos mais distantes reinos nas regiões mais geladas do planeta.", 99.99, 84.99, 6, "vento.webp"),
    ("Microonda", "Uma onda de um microondas. Obs: Não é o aparelho, apenas a onda.", 4.99, null, 132, "microonda.png"),
    ("Ansiedade", "Você sempre foi uma pessoa calma? Mude isso para sempre. Agora eles não te amam mais (você acha). Contém inseguranças de brinde!", 9.99, null, 139082, "ansiedade.webp"),
    ("Letra do Alfabeto Árabe", "Aprenda a pronunciar uma letra do alfabeto árabe a escolha.", 4.99, null, 132, "alfabeto-arabe.jpg"),
    ("Dado de infinitos lados", "Um dado com todas as possibilidades do mundo. Ao jogá-lo, pode sair todas as obras de Shakespeare ou o número 8 (entre outras possibilidades).", 399.99, null, 3, "dados-de-infinitos-lados.jpg"),
    ("Sapatos Gelados", "Você agora pode andar na água, usando esses sapatos que congelam onde você pisa.", 149.99, 99.99, 9, "sapato-gelado.jpeg"),
    ("Divin(h)o", "Um cálice com um vinho divino do divo Dionísio. Ao beber dele, você fica muito poderoso, porém, claramente bêbado.", 199.99, null, 4, "divinho.jpg"),
    ("Protetor Solar FPS 100", "Um protetor solar que protege 100% contra os raios ultra-violentos. Passá-lo no corpo o torna imune a queimaduras.", 199.99, 149.99, 26, "protetor-solar.webp"),
    ("Pedra Quântica", "Uma pedra comum, porém, ao deixar de olhar para ela, ela teletransporta.", 99.99, null, 26, "pedra-quantica.jpeg"),
    ("Tira Sombras", "Um produto inovador, que tira a sombras de lugares, deixando o ambiente claro.", 49.99, null, 28, "tira-sombras.jpeg");
    
create table orders_has_products (
    id_orders int,
    id_products int,
    quantity int not null,
    price decimal(6,2) not null,
    primary key (id_orders, id_products),
	foreign key (id_orders) references orders(id) on delete cascade,
    foreign key (id_products) references products(id) on delete cascade
);

create table categories (
	id int primary key auto_increment,
    name varchar(45) not null unique,
    description varchar(120),
    index (name)
);
 
insert into categories(name)
values("services"),
	("decoration"),
    ("fantasy"),
    ("concept"),
	("classes"),
    ("famous"),
    ("style"),
	("fashion"),
    ("food"),
    ("companion"),
	("tools"),
    ("receipt"),
    ("medicine"),
	("idol"),
    ("beauty"),
    ("power"),
	("physics"),
    ("clothes");

create table products_has_categories (
    id_products int,
    id_categories int,
    primary key (id_products, id_categories),
    foreign key (id_products) references products(id) on delete cascade,
    foreign key (id_categories) references categories(id) on delete cascade
);

insert into products_has_categories(id_products, id_categories)
values (1, 1),
(2, 2),
(2, 3),
(3, 4),
(4, 1),
(5, 4),
(5, 5),
(6, 4),
(6, 5),
(7, 6),
(7, 2),
(7, 3),
(8, 2),
(8, 7),
(8, 8),
(9, 2),
(9, 7),
(9, 8),
(9, 4),
(10, 9),
(11, 7),
(11, 10),
(11, 8),
(11, 2),
(11, 5),
(12, 11),
(12, 12),
(13, 13),
(14, 6),
(15, 6),
(15, 14),
(15, 15),
(15, 8),
(15, 7),
(15, 10),
(16, 11),
(16, 1),
(17, 13),
(17, 4),
(18, 13),
(18, 4),
(18, 5),
(19, 3),
(19, 16),
(20, 17),
(20, 4),
(21, 4),
(22, 4),
(22, 5),
(22, 1),
(23, 3),
(23, 11),
(24, 18),
(24, 7),
(24, 3),
(24, 8),
(25, 15),
(25, 7),
(25, 6),
(25, 3),
(25, 9),
(26, 17),
(26, 13),
(27, 17),
(27, 3),
(27, 2),
(28, 17),
(28, 11);

create table reviews (
    id int primary key auto_increment,
    id_users int,
    id_products int,
    rating decimal(2, 1) not null,
    comment varchar(255) not null,
    foreign key (id_users) references users(id) on delete cascade,
    foreign key (id_products) references products(id) on delete cascade,
	created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp
);

insert into reviews(id_users, id_products, rating, comment)
values(1, 1, 5, "Mão muito macia. Adorei!"),
	(2, 1, 4.5, "Poderia colocar mais hidratante na mão antes de fazer o serviço. Tirando isso, muito bom!"),
    (3, 1, 2, "Mão muito oleosa e áspera. Não curti"),
    (4, 2, 5, "Gostei muito. As minhas vieram pintadas, mesmo eu não pagando."),
    (5, 2, 4, "Precisava de uma manicure antes do envio."),
    (6, 3, 5, ""),
    (7, 3, 5, "Veio nada"),
    (8, 4, 5, "Ele recitou todas as frases do filme do Rocky Balboa. Hoje comecei a malhar."),
    (9, 4, 5, "OMG. Beautiful words."),
    (10, 5, 5, "Gabaritei a prova de matemática."),
    (11, 5, 2, "Não entendi nada"),
    (12, 6, 5, "Muito bom, gabaritei a prova de matemática"),
    (13, 6, 2, "Não entendi nada."),
    (14, 7, 4.5, "Achei muito lindo a decoração. Amei"),
    (15, 8, 5, "Muito útil para tampar a calvície."),
    (16, 10, 5, "Adorei o gosto. Muito bom."),
    (17, 11, 3, "Não fez meus temas. Estou indignada"),
    (18, 11, 5, "Gostei."),
    (19, 12, 5, "Eu comprei a compra e ela realmente foi feita. 10/10"),
    (20, 13, 2, "Parece que meu nariz ficou pior do que quando comecei a usar. Péssimo!"),
    (21, 14, 5, "Adorei o trailer, porém achei um pouco caro."),
    (22, 15, 5, "Adorei a maquiagem."),
    (23, 15, 5, "Achei muito bonita a franja"),
    (24, 16, 1, "Encomenda chegou e não lembrava o que era. Tomei um susto."),
    (25, 18, 5, "Muito útil. Usei durante a prova e tirei PD!"),
    (26, 20, 2, "Não esquentou a minha comida."),
    (27, 21, 0, "Não gostei"),
    (28, 21, 0, "Veio repetida."),
    (29, 22, 4.5, "Facilitou para eu ensinar aos meus alunos como se pronuncia ي"),
    (30, 23, 2, "Acabei sem querer rompendo o conceito do espaço tempo. Não gostei."),
    (31, 24, 2, "Achei meio inútil."),
    (32, 24, 3, "Não entendi a utilidade"),
    (33, 25, 3, "Miuto boom o gosto ma s nao~ fique bebado."),
    (34, 26, 2, "Passei no meu computador, mas o FPS continuou em 30."),
    (35, 27, 3, "Muito bonita, porém ela sumiu."),
    (36, 28, 4, "Gostei bastante. Ainda bem que isso existe, já que não tem nada parecido no mercado.");

create table favorites (
    id_users int,
    id_products int,
    primary key(id_users, id_products),
    foreign key (id_users) references users(id) on delete cascade,
    foreign key (id_products) references products(id) on delete cascade,
    favorited_at timestamp default current_timestamp
);