INSERT INTO "users" ("username", "hashedPassword")
VALUES ('johndoe', 'Mysecretpassword1!');

INSERT INTO "recipes" ("name", "description", "photoUrl", "steps", "ingredients", "userId")
VALUES ('Chocolate Cake', 'A delicious chocolate cake recipe', 'https://example.com/chocolate-cake.jpg',
        '{"Preheat the oven to 350F","Mix dry ingredients","Mix wet ingredients","Combine dry and wet ingredients","Bake for 30 minutes"}',
        '{"Flour","Sugar","Cocoa powder","Eggs","Milk","Oil","Vanilla extract","Baking powder","Salt"}', 1);
