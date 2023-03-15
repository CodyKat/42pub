<?php
$servername = "localhost";
$username = "root";
$password = "jaemjeon";
$dbname = "USERS";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";



$sql = "SELECT id, name FROM topic";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // Output data of each row
  echo "<table><tr><th>ID</th><th>Name</th><th>Email</th></tr>";
  while($row = $result->fetch_assoc()) {
    echo "<tr><td>".$row["id"]."</td><td>".$row["name"]."</td></tr>";
  }
  echo "</table>";
} else {
  echo "0 results";
}
$conn->close();
?>

