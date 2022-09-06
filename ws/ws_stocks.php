<?php

	require_once('../class/products.class.php');
	
	$products= new products();
	$op=0;
	if(isset($_GET['op'])){
		$op = $_GET['op'];
	}

	switch ($op) {
		//display ordered
		case 1:
			$result=$products->getProducts();
			break;

			case 2:
				$p_id= $_GET['p_id'];
				$result=$products->getProduct($p_id);
				break;

				case 3:
					$name= $_GET['name'];
					$price= $_GET['price'];
					$cost= $_GET['cost'];
					$quantity= $_GET['quantity'];
					$note= $_GET['note'];

					$result=$products->AddProduct($name, $price, $quantity, $cost, $note);
					break;
				
			case 4:
				$id = $_GET['id'];
				$result=$products->DelProduct($id);
				break;

				case 5:
					$id = $_GET['id'];
					$name= $_GET['name'];
					$price= $_GET['price'];
					$cost= $_GET['cost'];
					$quantity= $_GET['quantity'];
					$note= $_GET['note'];

					$result=$products->UpdateProduct($id,$name, $price, $quantity, $cost, $note);
					break;
			
				case 6:
					$id = $_GET['id'];
					$result=$products->getPrice($id);
					break;

				case 7:
					$id = $_GET['id'];
					$quantity= $_GET['quantity'];
					$total= $_GET['total'];
					$dateAndTime= $_GET['dateAndtime'];
					$result=$products->AddnewSold($id, $quantity, $total, $dateAndTime);
					break;

					case 8:
						$result=$products->getsold();
						break;

 
	 
		default:
		
			break;
	}	
    
	header("Content-type:application/json");
	echo json_encode($result);

?>

