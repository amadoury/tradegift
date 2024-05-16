CREATE DATABASE progweb;

CREATE TABLE "user" (
    pseudo VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
    points INTEGER,
    datenaissance date
);

CREATE TABLE gerante (
    pseudo VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255),
);

CREATE TABLE cadeaux (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255),
    prix INTEGER,
    taille TEXT,
    couleurs TEXT,
    image TEXT
);

INSERT INTO cadeaux(nom, prix, taille, couleurs, image) VALUES
('Apple Watch', 499, 'l', 'rouge:noir', 'applewatch.jpg'),
('Crème Hydratant', 75, 's', 'blanc:marron', 'boite-choc.jpg'),
('Palermo', 99, 'm', 'jaune', 'boite-jaune.jpg'),
('Bracelet Or', 350, 'xl', 'or', 'bracelet-or.png'),
('Casquette', 150, 'm', 'green', 'casquette-vert.png'),
('Ceinture', 49, 'l', 'marron', 'ceinture-choc.jpg'),
('Ceinture', 49, 'xl', 'vert', 'ceinture-verte.jpg'),
('Chaussette', 25, 'xl', 'noir:blanc', 'chaussette-rhude.jpg'),
('Colier', 150, 'm', 'or:blanc', 'colier-key.png'),
('Colier Love', 99, 'l:m:s', 'noir:blanc', 'colier-love.png'),
('Costume', 399, 'xl:l:m', 'gris:noir', 'costume-color.jpg'),
('creme.jpg', 10, '', 'blue', 'creme.jpg.jpg'),
('Short Homme', 75, 'xl:m:s', 'maron', 'cullote-rhude.jpg'),
('Echarpe', 49, 'l:m:s', 'maron', 'echarpe.jpg'),
('Echarpe Femme', 15, 's', 'rouge', 'echarpe-rouge.jpg'),
('Gant', 45, 'xl:l:m', 'noir', 'gant-noir.jpg'),
('Gourde', 9, '', 'gris', 'gourde.jpg'),
('Veste Homme', 150, 'xl:m:l', 'noir', 'jacket-noir.jpg'),
('Veste Etudiant', 99, 'm:l', 'vert:bleu', 'jacket-student.jpg'),
('Casquette', 39, 's:m', 'rouge', 'kepi.jpg'),
('Lunette', 65, 'm:l:s', 'noir', 'lunette-noir.jpg'),
('Masque', 25, 'xl', 'noir', 'masque-trei.jpg'),
('Montre', 130, 's:l', 'noir:blanc', 'montre-noir.jpg'),
('Montre Throne', 500, 'l:xl', 'noir:blanc', 'montre-throne.jpg'),
('Montre', 455, 'xl:xxl', 'vert', 'montre-verte.jpg'),
('Montre', 350, 's:m', 'maron', 'montre-x.jpg'),
('Chaussure', 95, 'xl', 'maron', 'moucassin-homme.png'),
('Chaussure', 100, 'xl:l', 'noir:maron', 'moucassin-homme-vert.png'),
('Pantalon', 78, 'xl', 'blanc', 'pantalon-blanc-style.jpg'),
('Parfum', 50, '', '', 'parfum-valentino.jpg'),
('Chaussure Femme', 80, 'xl:l', 'vert', 'shoes-women-green.jpg');

INSERT INTO gerante VALUES
('gerante', 'gerante');

INSERT INTO "user" VALUES
('john', 'john', 700, '2001-01-01'),
('doe', 'doe', 1000, '2009-05-01'),
('bill', 'bill', 50, '2005-02-20'),
('bilal', 'bilal', 500, '2000-01-01'),
('mousto', 'mousto', 600, '2007-02-02');



























