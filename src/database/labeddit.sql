-- Active: 1674516160340@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    nickname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL
);
INSERT INTO users (id, nickname, email, password, role)
VALUES
    ("u001", "Marina", "marina@email.com", "M@rina123", "ADMIN"),
    ("u002", "Alex", "alex@email.com", "@Lex1234", "NORMAL"),
    ("u003", "Andrea", "andrea@email.com", "Andre@123", "NORMAL");


CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    comments INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
INSERT INTO posts (id, creator_id, content)
VALUES
    ("p001", "u001", "Bora pra praia?!"),
    ("p002", "u002", "Cansativo o dia!"),
    ("p003", "u003", "Trabalhando muito!");

CREATE TABLE comments(
    id PRIMARY KEY UNIQUE NOT NULL,
    post_id UNIQUE NOT NULL,
    user_id NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
INSERT INTO comments (id, post_id, user_id, content)
VALUES
    ("c001", "p001", "u003", "Que praia? To dentro!"),
    ("c002", "p002", "u001", "Demais migooo! Saudades!"),
    ("c003", "p003", "u002", "Somos dois! Bora sair pra descansar a cabeça!");

CREATE TABLE likes_dislikes_posts(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE 
);
CREATE TABLE likes_dislikes_comments(
    user_id TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE 
);

SELECT 
    posts.id,
    posts.creator_id,
    posts.content,
    posts.likes,
    posts.dislikes,
    posts.created_at,
    posts.updated_at,
    users.nickname AS creator_nickname
FROM posts
JOIN users
ON posts.creator_id = users.id;

UPDATE users
SET password = "$2a$12$iSd0f004.jVFVrAjslARD.myipBt.4b0Sbf/8VTvZAqIYiq6GbDju"
WHERE id = "u001";

UPDATE users
SET password = "$2a$12$ZLXrqt.6dqrzRnpba.u8zu.S97F0V8TLVLYeU1jaBIRFNr2jCdVLu"
WHERE id = "u002";

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM comments;
SELECT * FROM likes_dislikes_posts;
SELECT * FROM likes_dislikes_comments;


DROP TABLE users;
DROP TABLE posts;
DROP TABLE comments;
DROP TABLE likes_dislikes_posts;
DROP TABLE likes_dislikes_comments;


SELECT 
    comments.id,
    comments.post_id,
    comments.user_id,
    comments.content,
    comments.likes,
    comments.dislikes,
    comments.created_at,
    comments.updated_at,
    users.nickname AS creator_nickname
FROM comments
JOIN users
ON comments.user_id = users.id;

SELECT 
    comments.id,
    comments.post_id,
    comments.user_id,
    comments.content,
    comments.likes,
    comments.dislikes,
    comments.created_at,
    comments.updated_at,
    posts.creator_id,
    posts.content,
    posts.likes,
    posts.dislikes,
    posts.comments,
    posts.created_at,
    posts.updated_at
FROM comments
JOIN posts
ON comments.post_id = posts.id;
