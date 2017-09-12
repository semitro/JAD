<?php
$x=$_POST['X'];
$R=$_POST['R'];
$y = $_POST['whichButton'];
 if(inRange($x,$y,$R))
 	echo "yes";
 else
 	echo "no";

function inRange($x, $y, $R){
	// The left area
	if($x >= -$R and $x <= 0){
		echo "left";
		if($y <= $X + $R and  $y>-$R)
			return true;
	}
	// x^2 + y^2 = sqrt(R)
	
	if($x>=0 and $x <= $R){
		echo "right";
		// fix the bag with right area!!
		if(
			$y >= 0 and
			$x*$x + $y*$y <= $R*$R
			)
			return true;
	}
	return false;
}
?>