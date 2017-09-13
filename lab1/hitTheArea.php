<?php
		if($_POST['checkMath']) {
			if(extension_loaded('bcmath'))
				print 'true';
			else
				print 'false';
			exit;
		}
		
	 	$start_time = microtime(true);
		$x=$_POST['X'];
		$R=$_POST['R'];
		$y = $_POST['Y'];
 		$inTheArea = inRange($x,$y,$R);

		function inRange($x, $y, $R){
			if(extension_loaded('bcmath')) {
				bcscale(100);
				if( 	// left side
					bccomp($x, -$R)   != -1
					and
					bccomp($x, "0.0") != 1
					)
				{
					if( bccomp( $y, bcadd($x, $R) ) != 1
								and bccomp($y, -$R) == 1 ) 
						return true;
				}
				// The right area
				if(bccomp($x, "0.0") != -1 and bccomp($x, $R) != 1){
					if(bccomp($y, "0.0") != -1 and
							bccomp(    bcadd( bcmul($x, $x),  bcmul($y, $y) ) ,       bcmul($R, $R) ) != 1
						)
						return true;
				}
				return false;
			}
			else {
				if($x >= -$R and $x <= 0){
					if($y <= $X + $R and  $y>-$R)
						return true;
				}				
				if($x>=0 and $x <= $R){
					if(
						$y >= 0 and
						$x*$x + $y*$y <= $R*$R
						)
						return true;
				}
				return false;
			}
		}
?>
	<tr>
		<td><?php echo $inTheArea ? 'Да': 'Нет' ?></td>
		<td><?php echo  $x ?></td>
		<td><?php echo  $y ?></td>
		<td><?php echo  $R ?></td>
		<td><?php echo microtime(true) - $start_time ?></td>
		<td><?php echo date("h:i:s") ?></td>
	</tr>

