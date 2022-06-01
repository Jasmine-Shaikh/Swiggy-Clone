function navbarHTML() {
    return ` <header>
    <div id="headerContainer">
        <div id="headerContentContainer">
            <a href="index.html" id="logo"><img src="https://cdn.worldvectorlogo.com/logos/swiggy-1.svg"
                    alt="swiggylogo"></a>

            <div id="currentLocation">Bangalore, Karnataka, India</div>

            <ul id="headerContainerRight">
                <li id="search">
                    <a href="search.html"><img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/2048px-Search_Icon.svg.png">Search</a>
                </li>
                <li id="offer">
                    <a href="offers.html"><img src="https://static.thenounproject.com/png/971055-200.png" alt="">
                        Offers</a>
                </li>
                <li id="help">
                    <a href="help.html"><img src="https://cdn.pixabay.com/photo/2016/07/23/13/18/pokemon-1536847_960_720.png"
                            alt=""> Help</a>
                </li>
                <li id="signIn">

                <a href="./landingPage.html" id="signInA"><img src="https://www.transparentpng.com/thumb/user/single-user-icon-png-free--rLHSHx.png" alt="">Guest</a>
            </li>
                <li id="cart"><a href="./checkout.html"> Cart<span id="noOfCartItems"></span></a></li>
            </ul>
        </div>
    </div>
</header>`
}

export { navbarHTML };