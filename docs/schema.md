# Schema Information

## posts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
description | text      | not null
date        | datetime  | not null
value       | integer   | not null, default: 0
author_id   | integer   | not null, foreign key (references users), indexed

## images
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
post_id     | string    | not null, foreign key (references posts), indexed
image_url   | string    | not null
title       | string    | not null
description | text      |

## comments
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
body           | string    | not null
value          | integer   | not null, default: 0
user_id        | integer   | not null, foreign key (references users), indexed
commentable_id | string    | not null, foreign key (references commentables), indexed

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
