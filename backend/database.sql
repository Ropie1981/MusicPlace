SET foreign_key_checks = 0;

DROP TABLE IF EXISTS user, ad, instrument, gear, brand, instrument_category, gear_category;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  password VARCHAR(255),
  bio TEXT,
  city VARCHAR(50),
  phone VARCHAR(20),
  profile_picture VARCHAR(255),
  registration_date DATE,
  admin BOOLEAN,
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
  FOREIGN KEY (user_id) REFERENCES user(id)
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

INSERT INTO user (id, firstname, lastname, password, bio, city, phone, profile_picture, registration_date, admin)
VALUES
  (1, 'John', 'Doe', 'password123', 'I am a musician.', 'New York', '123-456-7890', 'profile1.jpg', '2023-01-01', false),
  (2, 'Jane', 'Smith', 'p@ssw0rd', 'Pianist and composer.', 'Los Angeles', '987-654-3210', 'profile2.jpg', '2022-11-15', false),
  (3, 'Michael', 'Johnson', 'mypass123', 'Guitarist and songwriter.', 'Chicago', '555-123-4567', 'profile3.jpg', '2023-03-10', false),
  (4, 'Emily', 'Wilson', 'securepass', 'Bassist and music teacher.', 'San Francisco', '111-222-3333', 'profile4.jpg', '2023-02-20', false),
  (5, 'David', 'Lee', 'davidpass', 'Drummer in a rock band.', 'Austin', '444-555-6666', 'profile5.jpg', '2023-04-05', false),
  (6, 'Sophia', 'Taylor', 'password123', 'Singer and vocal coach.', 'Nashville', '777-888-9999', 'profile6.jpg', '2023-03-01', false),
  (7, 'Ethan', 'Clark', 'ethanpass', 'Keyboardist and music producer.', 'Seattle', '666-777-8888', 'profile7.jpg', '2023-05-12', false),
  (8, 'Olivia', 'Harris', 'olivpass123', 'Violinist and orchestra member.', 'Boston', '222-333-4444', 'profile8.jpg', '2023-02-08', false),
  (9, 'James', 'Brown', 'jamespass', 'Saxophonist and jazz enthusiast.', 'New Orleans', '999-111-2222', 'profile9.jpg', '2023-06-20', false),
  (10, 'Ava', 'Miller', 'millerpass', 'Cellist and chamber musician.', 'Denver', '888-999-0000', 'profile10.jpg', '2023-01-25', false),
  (11, 'William', 'Davis', 'willpass123', 'Trumpeter and music educator.', 'Philadelphia', '333-444-5555', 'profile11.jpg', '2023-03-05', false),
  (12, 'Emma', 'Anderson', 'andersonpass', 'Flutist and orchestral performer.', 'San Diego', '555-666-7777', 'profile12.jpg', '2023-04-18', false),
  (13, 'Daniel', 'Taylor', 'danielpass', 'Guitarist and songwriter.', 'Los Angeles', '777-888-9999', 'profile13.jpg', '2023-05-28', false),
  (14, 'Mia', 'Wilson', 'miapass123', 'Pianist and composer.', 'New York', '444-555-6666', 'profile14.jpg', '2023-02-15', false),
  (15, 'Alexander', 'Roberts', 'alexpass', 'Drummer in a rock band.', 'Seattle', '666-777-8888', 'profile15.jpg', '2023-07-01', false),
  (16, 'Sophie', 'Green', 'sophpass123', 'Singer and vocal coach.', 'Los Angeles', '555-666-7777', 'profile16.jpg', '2023-04-10', false),
  (17, 'Benjamin', 'Turner', 'benpass', 'Keyboardist and music producer.', 'Austin', '222-333-4444', 'profile17.jpg', '2023-06-03', false),
  (18, 'Chloe', 'Stewart', 'chloepass123', 'Violinist and orchestra member.', 'Chicago', '999-111-2222', 'profile18.jpg', '2023-03-15', false),
  (19, 'Henry', 'White', 'henrypass', 'Saxophonist and jazz enthusiast.', 'New York', '888-999-0000', 'profile19.jpg', '2023-05-06', false),
  (20, 'Lily', 'Martin', 'martinpass123', 'Cellist and chamber musician.', 'Boston', '333-444-5555', 'profile20.jpg', '2023-02-28', false);


INSERT INTO ad (id, user_id, instrument_id, gear_id, publish_date, title, price, description, city, picture)
VALUES
  (1, 1, 1, 1, '2023-01-02', 'Guitar for Sale', 500.00, 'High-quality electric guitar for sale. Excellent condition.', 'New York', 'ad1.jpg'),
  (2, 2, 2, 2, '2023-02-05', 'Drum Set Rental', 50.00, 'Renting out a professional drum set for gigs and recordings.', 'Los Angeles', 'ad2.jpg'),
  (3, 3, 3, 3, '2023-03-10', 'Piano Lessons', 30.00, 'Experienced piano teacher offering lessons for beginners and intermediates.', 'Chicago', 'ad3.jpg'),
  (4, 4, 4, 4, '2023-02-20', 'Bass Guitar for Sale', 350.00, 'Selling a well-maintained bass guitar. Great for beginners.', 'San Francisco', 'ad4.jpg'),
  (5, 5, 5, 5, '2023-04-05', 'Drummer Available for Gigs', 100.00, 'Professional drummer available for live performances and studio recordings.', 'Austin', 'ad5.jpg'),
  (6, 6, 6, 6, '2023-03-01', 'Vocal Lessons', 40.00, 'Learn how to sing with proper technique and improve your vocal range.', 'Nashville', 'ad6.jpg'),
  (7, 7, 7, 7, '2023-05-12', 'Keyboardist for Hire', 200.00, 'Experienced keyboard player available for gigs and studio sessions.', 'Seattle', 'ad7.jpg'),
  (8, 8, 8, 8, '2023-02-08', 'Violin Lessons', 35.00, 'Beginner and intermediate violin lessons for all ages. Affordable rates.', 'Boston', 'ad8.jpg'),
(9, 9, 9, 9, '2023-06-20', 'Saxophone for Sale', 800.00, 'Professional alto saxophone in excellent condition. Comes with accessories.', 'New Orleans', 'ad9.jpg'),
  (10, 10, 10, 10, '2023-01-25', 'Cello Rental', 70.00, 'Renting out a high-quality cello for practice and performances.', 'Denver', 'ad10.jpg'),
  (11, 11, 11, 11, '2023-03-05', 'Trumpet Lessons', 25.00, 'Experienced trumpet player offering private lessons. All skill levels welcome.', 'Philadelphia', 'ad11.jpg'),
  (12, 12, 12, 12, '2023-04-18', 'Flute for Sale', 250.00, 'Silver-plated flute for sale. Suitable for beginner and intermediate players.', 'San Diego', 'ad12.jpg'),
  (13, 13, 13, 13, '2023-05-28', 'Guitar Lessons', 45.00, 'Learn how to play the guitar with personalized lessons. Flexible scheduling.', 'Los Angeles', 'ad13.jpg'),
  (14, 14, 14, 14, '2023-02-15', 'Piano for Sale', 900.00, 'Upright piano in excellent condition. Perfect for home or studio use.', 'New York', 'ad14.jpg'),
  (15, 15, 15, 15, '2023-07-01', 'Drum Lessons', 30.00, 'Professional drum instructor offering lessons for all ages and skill levels.', 'Seattle', 'ad15.jpg'),
  (16, 16, 16, 16, '2023-04-10', 'Vocalist for Events', 150.00, 'Talented vocalist available to perform at weddings, parties, and corporate events.', 'Los Angeles', 'ad16.jpg'),
  (17, 17, 17, 17, '2023-06-03', 'Keyboard Rental', 80.00, 'Renting out a high-quality keyboard with various sounds and features.', 'Austin', 'ad17.jpg'),
  (18, 18, 18, 18, '2023-03-15', 'Violin for Sale', 600.00, 'Handcrafted violin with a warm tone. Suitable for intermediate and advanced players.', 'Chicago', 'ad18.jpg'),
  (19, 19, 19, 19, '2023-05-06', 'Saxophone Lessons', 40.00, 'Professional saxophone instructor offering private lessons. All ages and levels.', 'New York', 'ad19.jpg'),
  (20, 20, 20, 20, '2023-02-28', 'Cello Lessons', 55.00, 'Experienced cello teacher offering personalized lessons. Beginner and intermediate students.', 'Boston', 'ad20.jpg');


INSERT INTO instrument (id, name, description, category_id, brand_id)
VALUES
  (1, 'Guitar', '6-string electric guitar', 1, 1),
  (2, 'Drums', '5-piece drum set', 2, 2),
  (3, 'Piano', '88-key digital piano', 3, 3),
  (4, 'Bass Guitar', '4-string electric bass guitar', 1, 4),
  (5, 'Drum Set', 'Complete drum set with cymbals and hardware', 2, 2),
  (6, 'Microphone', 'Professional condenser microphone', 4, 5),
  (7, 'Keyboard', '88-key weighted keyboard', 3, 3),
  (8, 'Violin', '4/4 full-size violin', 5, 6),
  (9, 'Saxophone', 'Alto saxophone with brass body', 7, 7),
  (10, 'Cello', '4/4 full-size cello', 5, 6),
  (11, 'Trumpet', 'Bb trumpet with brass construction', 7, 8),
  (12, 'Flute', 'Silver-plated concert flute', 8, 9),
  (13, 'Acoustic Guitar', 'Steel-string acoustic guitar', 1, 1),
  (14, 'Keyboard Synthesizer', 'Professional synthesizer with multiple sound engines', 3, 10),
  (15, 'Electric Violin', '4/4 electric violin with bow and case', 5, 11),
  (16, 'Clarinet', 'Bb clarinet with wooden body', 8, 12),
  (17, 'Trombone', 'Tenor trombone with F attachment', 7, 8),
  (18, 'Harp', 'Concert pedal harp', 5, 13),
  (19, 'Accordion', '120-bass piano accordion', 8, 14),
  (20, 'Mandolin', '8-string mandolin with solid spruce top', 1, 15);

INSERT INTO instrument_category (id, instrument_category_name)
VALUES
  (1, 'String'),
  (2, 'Percussion'),
  (3, 'Keyboard'),
  (4, 'Microphone'),
  (5, 'Orchestral'),
  (6, 'Wind'),
  (7, 'Brass'),
  (8, 'Woodwind'),
  (9, 'Guitar'),
  (10, 'Synthesizer'),
  (11, 'Electric'),
  (12, 'Clarinet'),
  (13, 'Harp'),
  (14, 'Accordion'),
  (15, 'Mandolin');


INSERT INTO brand (id, brand_name)
VALUES
  (1, 'Fender'),
  (2, 'Pearl'),
  (3, 'Yamaha'),
  (4, 'Shure'),
  (5, 'Roland'),
  (6, 'Stentor'),
  (7, 'Selmer'),
  (8, 'Bach'),
  (9, 'Gemeinhardt'),
  (10, 'Korg'),
  (11, 'NS Design'),
  (12, 'Buffet Crampon'),
  (13, 'Lyon & Healy'),
  (14, 'Hohner'),
  (15, 'Kentucky');

INSERT INTO gear (id, gear_name, description, brand_id, category_id)
VALUES
  (1, 'Amplifier', '50W guitar amplifier', 1, 16),
  (2, 'Cymbals', 'Set of professional cymbals', 2, 2),
  (3, 'Keyboard Stand', 'Sturdy stand for keyboards and synthesizers', 3, 17),
(5, 'Microphone Stand', 'Adjustable stand for holding microphones', 4, 19),
  (6, 'MIDI Controller', 'Compact MIDI controller for music production', 5, 10),
  (7, 'Violin Bow', 'High-quality bow for violin', 6, 5),
  (8, 'Saxophone Reeds', 'Box of 10 saxophone reeds', 7, 6),
  (9, 'Cello Bow', 'Brazilwood cello bow with ebony frog', 6, 5),
  (10, 'Trumpet Mouthpiece', 'Standard trumpet mouthpiece', 8, 7),
  (11, 'Flute Cleaning Rod', 'Cleaning rod for flute maintenance', 9, 8),
  (12, 'Acoustic Guitar Strings', 'Set of light gauge acoustic guitar strings', 1, 9),
  (13, 'Synthesizer Pedal', 'Expression pedal for controlling synthesizer parameters', 10, 10),
  (14, 'Electric Violin Bow', 'Carbon fiber bow for electric violin', 11, 5),
  (15, 'Clarinet Reeds', 'Box of 10 clarinet reeds', 12, 8),
  (16, 'Trombone Mouthpiece', 'Standard trombone mouthpiece', 8, 7),
  (17, 'Harp Tuning Key', 'Tuning key for harp strings', 13, 13),
  (18, 'Accordion Straps', 'Adjustable straps for accordion', 14, 14),
  (19, 'Mandolin Case', 'Hardshell case for mandolin', 15, 15),
  (20, 'Guitar Capo', 'Clamp-style capo for guitar', 1, 9);


INSERT INTO gear_category (id, gear_category_name)
VALUES
  (1, 'Amplification'),
  (2, 'Cymbals'),
  (3, 'Keyboard Accessories'),
  (4, 'Drum Accessories'),
  (5, 'String Accessories'),
  (6, 'Reeds'),
  (7, 'Brass Accessories'),
  (8, 'Woodwind Accessories'),
  (9, 'Guitar Accessories'),
  (10, 'Synthesizer Accessories'),
  (11, 'Violin Accessories'),
  (12, 'Clarinet Accessories'),
  (13, 'Harp Accessories'),
  (14, 'Accordion Accessories'),
  (15, 'Mandolin Accessories');




SET foreign_key_checks = 1;

