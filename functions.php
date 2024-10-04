<?php

$mysqli = false;
function connectDB () {
    global $mysqli;
    $mysqli = new mysqli("DESKTOP-DGIRJ6K\SQLEXPRESS","","","test");
}

?>