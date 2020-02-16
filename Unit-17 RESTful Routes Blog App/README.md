#Blog App Requirements 
-> Setup Blog App
-> Create Blog Model 
-> Defining Routes in Blog App
    1. INDEX (/blogs -- GET) => This will show list of all blogs
    2. NEW (/blogs/new -- GET) => Load form for creating a new blog
    3. CREATE (/blogs -- POST) => Add new blog to DB and redirect to "/blogs"
    4. SHOW (/blogs/:id -- GET) => Display detailed information about single blog
    5. EDIT (/blogs/:id/edit -- GET) => Load form for editing specific blog post
    6. UPDATE (/blogs/:id -- PUT) => Update a particular post in the database
    7. DESTROY (/blogs/:id -- DELETE) => Remove particular blog from the DB and redirect