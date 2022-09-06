<?php

  require_once('../DAL/DAL.class.php');

  class products{

    public function getProducts(){
        $sql="Select * from stocks where status='1'";
		
	    	$db= new DAL();
		
		    $rows= $db->getData($sql);
		
	    	return $rows;	
    }

    public function getProduct($id){
      $sql="Select * from stocks where id=$id";
  
      $db= new DAL();
  
      $rows= $db->getData($sql);
  
      return $rows;	
  }

  public function AddProduct($name,$price, $quantity, $cost, $note){
    $sql="INSERT into stocks (name, quantity, cost, note,price ) VALUES( '$name', '$quantity', '$cost', '$note', '$price' );";

    $db= new DAL();

    $rows= $db->ExecuteQuery($sql);

    return $rows;	
}

  
  public function DelProduct($id){
    $sql="DELETE FROM stocks where id=$id";

    $db= new DAL();

    $rows= $db->ExecuteQuery($sql);

    return $rows;	
  }


  public function UpdateProduct($id,$name,$price, $quantity, $cost, $note){
    $sql="UPDATE stocks set name='$name', quantity='$quantity', cost='$cost', note='$note', price='$price' where id='$id';";

    $db= new DAL();

    $rows= $db->ExecuteQuery($sql);

    return $rows;	
  }


  public function getPrice($id){
    $sql="select price from stocks where id='$id'; ";

    $db= new DAL();

    $rows= $db->getData($sql);

    return $rows;	
  }


  public function AddnewSold($id, $quantity, $total, $dateAndTime){
    $sql = "INSERT INTO sold  (itm_id, sold_quantity, total, dateAndTime ) VALUES( '$id', '$quantity', '$total', '$dateAndTime');";

    $db= new DAL();

    $rows= $db->ExecuteQuery($sql);

    return $rows;	
  }

  public function getsold(){
    $sql="SELECT * FROM sold inner join stocks on stocks.id= sold.itm_id;";

    $db= new DAL();

    $rows= $db->getData($sql);

    return $rows;	
}


  }




?>
