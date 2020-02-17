    <h2>Blog App Requirements</h2> 
    <p>Defining Routes in Blog App</p>
    <ul>
    <li><strong>INDEX</strong> (/blogs -- GET) => This will show list of all blogs</li>
    <li><strong>NEW</strong> (/blogs/new -- GET) => Load form for creating a new blog</li>
    <li><strong>CREATE</strong> (/blogs -- POST) => Add new blog to DB and redirect to "/blogs"</li>
    <li><strong>SHOW</strong> (/blogs/:id -- GET) => Display detailed information about single blog</li>
    <li><strong>EDIT</strong> (/blogs/:id/edit -- GET) => Load form for editing specific blog post</li>
    <li><strong>UPDATE</strong> (/blogs/:id -- PUT) => Update a particular post in the database</li>
    <li><strong>DESTROY</strong> (/blogs/:id -- DELETE) => Remove particular blog from the DB and redirect</li>
    </ul>
