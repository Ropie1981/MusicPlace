SET foreign_key_checks = 0;

DROP TABLE IF EXISTS user, ad, instrument, gear, brand, instrument_category, gear_category;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL,
  bio TEXT,
  city VARCHAR(50),
  phone VARCHAR(20),
  profile_picture VARCHAR(255),
  registration_date DATE,
  admin BOOLEAN DEFAULT 0,
  PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE ad (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  instrument_id INT,
  gear_id INT,
  publish_date DATE,
  title VARCHAR(100),
  price INT,
  description TEXT,
  city VARCHAR(50),
  picture VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE instrument (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50),
  description TEXT,
  category_id INT,
  brand_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES instrument_category(id),
  FOREIGN KEY (brand_id) REFERENCES brand(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE instrument_category (
  id INT NOT NULL AUTO_INCREMENT,
  instrument_category_name VARCHAR(50),
  PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE brand (
  id INT NOT NULL AUTO_INCREMENT,
  brand_name VARCHAR(50),
  PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE gear (
  id INT NOT NULL AUTO_INCREMENT,
  gear_name VARCHAR(50),
  description TEXT,
  brand_id INT,
  category_id INT,
  FOREIGN KEY (brand_id) REFERENCES brand(id),
  FOREIGN KEY (category_id) REFERENCES gear_category(id),
  PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE gear_category (
  id INT NOT NULL AUTO_INCREMENT,
  gear_category_name VARCHAR(50),
  PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO user (id, firstname, lastname, email, hashedPassword, bio, city, phone, profile_picture, registration_date, admin)
VALUES
  (1, 'admin', 'test', 'admin@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$Rkfivx8mkJszjhbQQ1Gv3g$IUGYr+UXFlZZCXxKGGhUyIK+yrB0gLZVq1Gc3Lka98o', 'I am a musician.', 'New York', '123-456-7890', 'profile1.jpg', '2023-01-01', 1),
  (2, 'Jane', 'Smith', 'mail1@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$Rkfivx8mkJszjhbQQ1Gv3g$IUGYr+UXFlZZCXxKGGhUyIK+yrB0gLZVq1Gc3Lka98o', 'Pianist and composer.', 'Los Angeles', '987-654-3210', 'profile2.jpg', '2022-11-15', 0),
  (3, 'Michael', 'Johnson', 'mail2@mail.com', '$argon2id$v=19$m=65536,t=3,p=4$Rkfivx8mkJszjhbQQ1Gv3g$IUGYr+UXFlZZCXxKGGhUyIK+yrB0gLZVq1Gc3Lka98o', 'Guitarist and songwriter.', 'Chicago', '555-123-4567', 'profile3.jpg', '2023-03-10', 0),
  (4, 'Emily', 'Wilson', 'mail3@mail.com', 'securepass', 'Bassist and music teacher.', 'San Francisco', '111-222-3333', 'profile4.jpg', '2023-02-20', 0),
  (5, 'David', 'Lee', 'mail4@mail.com', 'davidpass', 'Drummer in a rock band.', 'Austin', '444-555-6666', 'profile5.jpg', '2023-04-05', 0),
  (6, 'Sophia', 'Taylor', 'mail5@mail.com', 'password123', 'Singer and vocal coach.', 'Nashville', '777-888-9999', 'profile6.jpg', '2023-03-01', 0),
  (7, 'Ethan', 'Clark',  'mail6@mail.com','ethanpass', 'Keyboardist and music producer.', 'Seattle', '666-777-8888', 'profile7.jpg', '2023-05-12', 0),
  (8, 'Olivia', 'Harris', 'mail7@mail.com', 'olivpass123', 'Violinist and orchestra member.', 'Boston', '222-333-4444', 'profile8.jpg', '2023-02-08', 0),
  (9, 'James', 'Brown', 'mail8@mail.com', 'jamespass', 'Saxophonist and jazz enthusiast.', 'New Orleans', '999-111-2222', 'profile9.jpg', '2023-06-20', 0),
  (10, 'Ava', 'Miller', 'mail9@mail.com', 'millerpass', 'Cellist and chamber musician.', 'Denver', '888-999-0000', 'profile10.jpg', '2023-01-25', 0),
  (11, 'William', 'Davis', 'mailà@mail.com', 'willpass123', 'Trumpeter and music educator.', 'Philadelphia', '333-444-5555', 'profile11.jpg', '2023-03-05', 0),
  (12, 'Emma', 'Anderson', 'mail11@mail.com', 'andersonpass', 'Flutist and orchestral performer.', 'San Diego', '555-666-7777', 'profile12.jpg', '2023-04-18', 0),
  (13, 'Daniel', 'Taylor', 'mail12@mail.com', 'danielpass', 'Guitarist and songwriter.', 'Los Angeles', '777-888-9999', 'profile13.jpg', '2023-05-28', 0),
  (14, 'Mia', 'Wilson', 'mail13@mail.com', 'miapass123', 'Pianist and composer.', 'New York', '444-555-6666', 'profile14.jpg', '2023-02-15', 0),
  (15, 'Alexander', 'Roberts', 'mail14@mail.com', 'alexpass', 'Drummer in a rock band.', 'Seattle', '666-777-8888', 'profile15.jpg', '2023-07-01', 0),
  (16, 'Sophie', 'Green', 'mail15@mail.com', 'sophpass123', 'Singer and vocal coach.', 'Los Angeles', '555-666-7777', 'profile16.jpg', '2023-04-10', 0),
  (17, 'Benjamin', 'Turner', 'mail16@mail.com', 'benpass', 'Keyboardist and music producer.', 'Austin', '222-333-4444', 'profile17.jpg', '2023-06-03', 0),
  (18, 'Chloe', 'Stewart', 'mail17@mail.com', 'chloepass123', 'Violinist and orchestra member.', 'Chicago', '999-111-2222', 'profile18.jpg', '2023-03-15', 0),
  (19, 'Henry', 'White', 'mail18@mail.com', 'henrypass', 'Saxophonist and jazz enthusiast.', 'New York', '888-999-0000', 'profile19.jpg', '2023-05-06', 0),
  (20, 'Lily', 'Martin', 'mail19@mail.com', 'martinpass123', 'Cellist and chamber musician.', 'Boston', '333-444-5555', 'profile20.jpg', '2023-02-28', 0);


INSERT INTO ad (user_id, instrument_id, gear_id, publish_date, title, price, description, city, picture)
VALUES
  (2, 1, 1, '2023-01-02', 'Guitar for Sale', 500.00, 'High-quality electric guitar for sale. Excellent condition.', 'New York', 'ad1.jpg'),
  (4, 2, 2, '2023-02-05', 'Drum Set Rental', 50.00, 'Renting out a professional drum set for gigs and recordings.', 'Los Angeles', 'ad2.jpg'),
  (6, 3, 3, '2023-03-10', 'Piano Lessons', 30.00, 'Experienced piano teacher offering lessons for beginners and intermediates.', 'Chicago', 'ad3.jpg'),
  (8, 4, 4, '2023-02-20', 'Bass Guitar for Sale', 350.00, 'Selling a well-maintained bass guitar. Great for beginners.', 'San Francisco', 'ad4.jpg'),
  (9, 5, 5, '2023-04-05', 'Drummer Available for Gigs', 100.00, 'Professional drummer available for live performances and studio recordings.', 'Austin', 'ad5.jpg'),
  (1, 6, 6, '2023-03-01', 'Vocal Lessons', 40.00, 'Learn how to sing with proper technique and improve your vocal range.', 'Nashville', 'ad6.jpg'),
  (2, 7, 7, '2023-05-12', 'Keyboardist for Hire', 200.00, 'Experienced keyboard player available for gigs and studio sessions.', 'Seattle', 'ad7.jpg'),
  (4, 8, 8, '2023-02-08', 'Violin Lessons', 35.00, 'Beginner and intermediate violin lessons for all ages. Affordable rates.', 'Boston', 'ad8.jpg'),
(3, 9, 9, '2023-06-20', 'Saxophone for Sale', 800.00, 'Professional alto saxophone in excellent condition. Comes with accessories.', 'New Orleans', 'ad9.jpg'),
  (8, 10, 10, '2023-01-25', 'Cello Rental', 70.00, 'Renting out a high-quality cello for practice and performances.', 'Denver', 'ad10.jpg'),
  (15, 11, 11, '2023-03-05', 'Trumpet Lessons', 25.00, 'Experienced trumpet player offering private lessons. All skill levels welcome.', 'Philadelphia', 'ad11.jpg'),
  (2, 12, 12, '2023-04-18', 'Flute for Sale', 250.00, 'Silver-plated flute for sale. Suitable for beginner and intermediate players.', 'San Diego', 'ad12.jpg'),
  (3, 13, 13, '2023-05-28', 'Guitar Lessons', 45.00, 'Learn how to play the guitar with personalized lessons. Flexible scheduling.', 'Los Angeles', 'ad13.jpg'),
  (4, 14, 14, '2023-02-15', 'Piano for Sale', 900.00, 'Upright piano in excellent condition. Perfect for home or studio use.', 'New York', 'ad14.jpg'),
  (1, 15, 15, '2023-07-01', 'Drum Lessons', 30.00, 'Professional drum instructor offering lessons for all ages and skill levels.', 'Seattle', 'ad15.jpg'),
  (1, 16, 16, '2023-04-10', 'Vocalist for Events', 150.00, 'Talented vocalist available to perform at weddings, parties, and corporate events.', 'Los Angeles', 'ad16.jpg'),
  (7, 17, 17, '2023-06-03', 'Keyboard Rental', 80.00, 'Renting out a high-quality keyboard with various sounds and features.', 'Austin', 'ad17.jpg'),
  (8, 18, 18, '2023-03-15', 'Violin for Sale', 600.00, 'Handcrafted violin with a warm tone. Suitable for intermediate and advanced players.', 'Chicago', 'ad18.jpg'),
  (9, 19, 19, '2023-05-06', 'Saxophone Lessons', 40.00, 'Professional saxophone instructor offering private lessons. All ages and levels.', 'New York', 'ad19.jpg'),
  (2, 20, 20, '2023-02-28', 'Cello Lessons', 55.00, 'Experienced cello teacher offering personalized lessons. Beginner and intermediate students.', 'Boston', 'ad20.jpg');


INSERT INTO instrument (name, description, category_id, brand_id)
VALUES
  ('Guitar', '6-string electric guitar', 1, 1),
  ('Drums', '5-piece drum set', 2, 2),
  ('Piano', '88-key digital piano', 3, 3),
  ('Bass Guitar', '4-string electric bass guitar', 1, 4),
  ('Drum Set', 'Complete drum set with cymbals and hardware', 2, 2),
  ('Microphone', 'Professional condenser microphone', 4, 5),
  ('Keyboard', '88-key weighted keyboard', 3, 3),
  ('Violin', '4/4 full-size violin', 5, 6),
  ('Saxophone', 'Alto saxophone with brass body', 7, 7),
  ('Cello', '4/4 full-size cello', 5, 6),
  ('Trumpet', 'Bb trumpet with brass construction', 7, 8),
  ('Flute', 'Silver-plated concert flute', 8, 9),
  ('Acoustic Guitar', 'Steel-string acoustic guitar', 1, 1),
  ('Keyboard Synthesizer', 'Professional synthesizer with multiple sound engines', 3, 10),
  ('Electric Violin', '4/4 electric violin with bow and case', 5, 11),
  ('Clarinet', 'Bb clarinet with wooden body', 8, 12),
  ('Trombone', 'Tenor trombone with F attachment', 7, 8),
  ('Harp', 'Concert pedal harp', 5, 13),
  ('Accordion', '120-bass piano accordion', 8, 14),
  ('Mandolin', '8-string mandolin with solid spruce top', 1, 15);

INSERT INTO instrument_category (instrument_category_name)
VALUES
  ('String'),
  ('Percussion'),
  ('Keyboard'),
  ('Microphone'),
  ('Orchestral'),
  ('Wind'),
  ('Brass'),
  ('Woodwind'),
  ('Guitar'),
  ('Synthesizer'),
  ('Electric'),
  ('Clarinet'),
  ('Harp'),
  ('Accordion'),
  ('Mandolin');


INSERT INTO brand (brand_name)
VALUES
  ('Fender'),
  ('Pearl'),
  ('Yamaha'),
  ('Shure'),
  ('Roland'),
  ('Stentor'),
  ('Selmer'),
  ('Bach'),
  ('Gemeinhardt'),
  ('Korg'),
  ('NS Design'),
  ('Buffet Crampon'),
  ('Lyon & Healy'),
  ('Hohner'),
  ('Kentucky');

INSERT INTO gear (gear_name, description, brand_id, category_id)
VALUES
  ('Amplifier', '50W guitar amplifier', 1, 16),
  ('Cymbals', 'Set of professional cymbals', 2, 2),
  ('Keyboard Stand', 'Sturdy stand for keyboards and synthesizers', 3, 17),
('Microphone Stand', 'Adjustable stand for holding microphones', 4, 19),
  ('MIDI Controller', 'Compact MIDI controller for music production', 5, 10),
  ('Violin Bow', 'High-quality bow for violin', 6, 5),
  ('Saxophone Reeds', 'Box of 10 saxophone reeds', 7, 6),
  ( 'Cello Bow', 'Brazilwood cello bow with ebony frog', 6, 5),
  ('Trumpet Mouthpiece', 'Standard trumpet mouthpiece', 8, 7),
  ('Flute Cleaning Rod', 'Cleaning rod for flute maintenance', 9, 8),
  ('Acoustic Guitar Strings', 'Set of light gauge acoustic guitar strings', 1, 9),
  ('Synthesizer Pedal', 'Expression pedal for controlling synthesizer parameters', 10, 10),
  ('Electric Violin Bow', 'Carbon fiber bow for electric violin', 11, 5),
  ('Clarinet Reeds', 'Box of 10 clarinet reeds', 12, 8),
  ( 'Trombone Mouthpiece', 'Standard trombone mouthpiece', 8, 7),
  ('Harp Tuning Key', 'Tuning key for harp strings', 13, 13),
  ('Accordion Straps', 'Adjustable straps for accordion', 14, 14),
  ('Mandolin Case', 'Hardshell case for mandolin', 15, 15),
  ('Guitar Capo', 'Clamp-style capo for guitar', 1, 9);


INSERT INTO gear_category (gear_category_name)
VALUES
  ('Amplification'),
  ('Cymbals'),
  ('Keyboard Accessories'),
  ('Drum Accessories'),
  ('String Accessories'),
  ('Reeds'),
  ('Brass Accessories'),
  ('Woodwind Accessories'),
  ('Guitar Accessories'),
  ('Synthesizer Accessories'),
  ('Violin Accessories'),
  ('Clarinet Accessories'),
  ('Harp Accessories'),
  ('Accordion Accessories'),
  ('Mandolin Accessories');




SET foreign_key_checks = 1;

