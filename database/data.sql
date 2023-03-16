INSERT INTO "users" ("firstName", "lastName", "email", "hashedPassword", "createdAt")
VALUES ('John', 'Doe', 'johndoe@example.com', 'mysecretpassword', CURRENT_TIMESTAMP);

INSERT INTO "recipes" ("name", "description", "photoUrl", "steps", "ingredients", "userId")
VALUES ('Chocolate Cake', 'A delicious chocolate cake recipe', 'https://example.com/chocolate-cake.jpg',
        '{"Preheat the oven to 350F","Mix dry ingredients","Mix wet ingredients","Combine dry and wet ingredients","Bake for 30 minutes"}',
        '{"Flour","Sugar","Cocoa powder","Eggs","Milk","Oil","Vanilla extract","Baking powder","Salt"}', 1);
