@Code
    ViewData("Title") = "About"
End Code

<hgroup class="title">
    <h1>@ViewData("Title").</h1>
    <h2>@ViewData("Message")</h2>
</hgroup>

<article>
    <p>
        Use this area to provide additional information.
    </p>

    <p>
        Use this area to provide additional information.
    </p>

    <p>
        Use this area to provide additional information.
    </p>
</article>

<aside>
    <h3>Aside Title</h3>
    <p>
        Use this area to provide additional information.
    </p>
    <ul>
        <li>@Html.ActionLink("Home", "Index", "Home")</li>
        <li>@Html.ActionLink("About", "About", "Home")</li>
        <li>@Html.ActionLink("Contact", "Contact", "Home")</li>
    </ul>
</aside>