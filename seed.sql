
-- Account Types
CREATE TABLE AccountType (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, PRIMARY KEY (id));
INSERT INTO AccountType (name) VALUES ('Admin'), ('Trainee Admin'), ('Trainee'), ('Trainer')

-- Status
CREATE TABLE Status (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, PRIMARY KEY (id));
INSERT INTO Status (name) VALUES ('booked'), ('attended'), ('completed'), ('withdrawn'), ('absent'), ('waitlist')

-- Categories
CREATE TABLE Category (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, PRIMARY KEY (id));
INSERT INTO Category (name) VALUES ('BWC'), ('F0'), ('F2'), ('F3'),('F5'),('F9'),('FWC'),('FHQ'),('FP2'),('FP5'),('FE'),('H0'),('H3'),('H4'),('H5'),('H6'),('H7'),('HHQ'),('HO'),('HB'),('HPV'),('N3'),('TG'),('TM'),('TF'),('TC'),('APU'),('HQ 8071'),('Medical')
 -- for edgar
INSERT INTO Category (name) VALUES ('N3')
-- Requirements 
CREATE TABLE Requirement (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, hasSeniority BOOLEAN NOT NULL, rehackPeriod INT NOT NULL, extensionPeriod INT NOT NULL, seniorExtension INT, selfComplete BOOLEAN NOT NULL, alsoCompletes INT, refreshToMonthEnd BOOLEAN NOT NULL, PRIMARY KEY (id));
INSERT INTO Requirement (name, hasSeniority, rehackPeriod, extensionPeriod, seniorExtension, selfComplete, alsoCompletes, refreshToMonthEnd) VALUES ('DFS (R)', 1, 3, 36, 60, 0, NULL, 1),('DFS (Y)', 1, 0, 12, -1, 0, NULL, 1),('ACE', 0, 4, 12, NULL, 0, NULL, 0),('SVT', 0, 0, 12, NULL, 1, NULL, 1),('APT (F)', 1, 0, 36, 60, 0, NULL, 1),('APT (T)', 1, 0, 36, 60, 0, NULL, 1),('APT (H)', 1, 0, 36, 60, 0, NULL, 1),('NVG R (F)', 1, 0, 36, 60, 0, NULL, 1),('EST', 0, 0, 24, NULL, 0, NULL, 1),('Dgy (F)', 0, 0, 24, NULL, 0, NULL, 1),('Dgy (T/H)', 0, 0, 24, NULL, 0, NULL, 1),('HUET', 1, 0, 12, 36, 0, NULL, 1),('NVG R (H)', 1, 0, 36, 60, 0, NULL, 1);
UPDATE Requirement SET alsoCompletes = (SELECT id FROM Requirement WHERE name = 'DFS (Y)') WHERE name = "DFS (R)" 
UPDATE Requirement SET alsoCompletes = null WHERE name = "DFS (Y)"

-- CategoryToRequirements
CREATE TABLE CategoryToRequirement (id INT NOT NULL AUTO_INCREMENT, category INT NOT NULL, requirement INT NOT NULL, PRIMARY KEY (id), FOREIGN KEY (category) REFERENCES Category(id), FOREIGN KEY (requirement) REFERENCES Requirement(id));
INSERT INTO CategoryToRequirement (category, requirement) SELECT category.id, requirement.id FROM Category AS category CROSS JOIN Requirement AS requirement WHERE category.name IN ('BWC','F0','F2','F3','F5','F9','FWC','FHQ','FP2','FP5','FE') AND requirement.name IN ('ACE', 'APT (F)', 'Dgy (F)', 'SVT', 'NVG R (F)', 'DFS (R)', 'DFS (Y)', 'EST');
INSERT INTO CategoryToRequirement (category, requirement) SELECT category.id, requirement.id FROM Category AS category CROSS JOIN Requirement AS requirement WHERE category.name IN ('H0', 'HPV') AND requirement.name IN ('ACE', 'APT (H)', 'Dgy (T/H)', 'SVT', 'HUET');
INSERT INTO CategoryToRequirement (category, requirement) SELECT category.id, requirement.id FROM Category AS category CROSS JOIN Requirement AS requirement WHERE category.name IN ('H3','H4','H5','H6','H7','HHQ','HO','HB') AND requirement.name IN ('ACE', 'APT (H)', 'Dgy (T/H)', 'SVT', 'HUET', 'NVG R (H)');
INSERT INTO CategoryToRequirement (category, requirement) SELECT category.id, requirement.id FROM Category AS category CROSS JOIN Requirement AS requirement WHERE category.name IN ('TG','TM','TF', 'HQ 8071','N3')  AND requirement.name IN ('ACE', 'APT (T)', 'Dgy (T/H)','SVT');
INSERT INTO CategoryToRequirement (category, requirement) SELECT category.id, requirement.id FROM Category AS category CROSS JOIN Requirement AS requirement WHERE category.name IN ('TC') AND requirement.name IN ('ACE', 'APT (T)', 'Dgy (T/H)','SVT', 'NVG R (F)');
INSERT INTO CategoryToRequirement (category, requirement) SELECT category.id, requirement.id FROM Category AS category CROSS JOIN Requirement AS requirement WHERE category.name IN ('APU') AND requirement.name IN ('ACE', 'APT (T)', 'Dgy (T/H)','SVT', 'HUET');
INSERT INTO CategoryToRequirement (category, requirement) SELECT category.id, requirement.id FROM Category AS category CROSS JOIN Requirement AS requirement WHERE category.name IN ('Medical') AND requirement.name IN ('HUET');
 --for edgar
INSERT INTO CategoryToRequirement (category, requirement) SELECT category.id, requirement.id FROM Category AS category CROSS JOIN Requirement AS requirement WHERE category.name IN ('N3')  AND requirement.name IN ('ACE', 'APT (T)', 'Dgy (T/H)','SVT');