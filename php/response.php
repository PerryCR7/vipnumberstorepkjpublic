<!DOCTYPE html>
<html>
<head>
	<title>Cashfree - PG Response Details</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
	<h1 align="center">PG Response</h1>	

	<?php  
		//  $secretKey = "a18c8e4b8c4ecedc267cb2faafbfd1adb206bc5";
		 $secretkey = "a3377723d755c13d0360c758ffeee9324dbb7e31";
		 $orderId = $_POST["orderId"];
		 $orderAmount = $_POST["orderAmount"];
		 $referenceId = $_POST["referenceId"];
		 $txStatus = $_POST["txStatus"];
		 $paymentMode = $_POST["paymentMode"];
		 $txMsg = $_POST["txMsg"];
		 $txTime = $_POST["txTime"];
		 $signature = $_POST["signature"];
		 $data = $orderId.$orderAmount.$referenceId.$txStatus.$paymentMode.$txMsg.$txTime;
		 $hash_hmac = hash_hmac('sha256', $data, $secretkey, true) ;
		 $computedSignature = base64_encode($hash_hmac);
		 if ($signature == $computedSignature) {
			$data = array(
				"order_status"=> "Paid",
                "payment_status"=> "Order Placed",
				"process_status"=> "Order Placed",
				"payment_id"=> $txStatus,
				"payment_method"=> "CashFree",
				"vendor_payment_status"=> "Pending"
			);
			 
			$payload = json_encode($data);
			 
			// Prepare new cURL resource
			$urll = 'https://vipnumberapi.bigboychoice.com/api/v1/customer/cashfree_callback/'.$orderId;
			// $urll = 'http://localhost:3000/api/v1/customer/cashfree_callback/'.$orderId;
			$ch = curl_init($urll);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLINFO_HEADER_OUT, true);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
			 
			// Set HTTP Header for POST request 
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(
				'Content-Type: application/json',
				'Content-Length: ' . strlen($payload))
			);
			 
			// Submit the POST request
			$result = curl_exec($ch);
			$obj = json_decode($result, true);

			// print_r ($obj);
			// echo $obj["status"];
			// Close cURL session handle
			curl_close($ch);
			header('location:../success.html');
	 ?>

	<div class="container"> 
	<div class="panel panel-success">
	  <div class="panel-heading">Signature Verification Successful</div>
	  <div class="panel-body">
	  	<!-- <div class="container"> -->
	 		<table class="table table-hover">
			    <tbody>
			      <tr>
			        <td>Order ID</td>
			        <td><?php echo $orderId; ?></td>
			      </tr>
			      <tr>
			        <td>Order Amount</td>
			        <td><?php echo $orderAmount; ?></td>
			      </tr>
			      <tr>
			        <td>Reference ID</td>
			        <td><?php echo $referenceId; ?></td>
			      </tr>
			      <tr>
			        <td>Transaction Status</td>
			        <td><?php echo $txStatus; ?></td>
			      </tr>
			      <tr>
			        <td>Payment Mode </td>
			        <td><?php echo $paymentMode; ?></td>
			      </tr>
			      <tr>
			        <td>Message</td>
			        <td><?php echo $txMsg; ?></td>
			      </tr>
			      <tr>
			        <td>Transaction Time</td>
			        <td><?php echo $txTime; ?></td>
			      </tr>
			    </tbody>
			</table>
		<!-- </div> -->

	   </div>
	</div>
	</div>
	 <?php   
	  	} else {

			$data = array(
				"order_status"=> "Paid",
                "payment_status"=> "Order Placed",
				"process_status"=> "Order Placed",
				"payment_id"=> $txStatus,
				"payment_method"=> "CashFree",
				"vendor_payment_status"=> "Pending"
			);
			 
			$payload = json_encode($data);
			 
			// Prepare new cURL resource
			$urll = 'https://vipnumberapi.bigboychoice.com/api/v1/customer/cashfree_callback/'.$orderId;
			$ch = curl_init($urll);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLINFO_HEADER_OUT, true);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
			 
			// Set HTTP Header for POST request 
			curl_setopt($ch, CURLOPT_HTTPHEADER, array(
				'Content-Type: application/json',
				'Content-Length: ' . strlen($payload))
			);
			 
			// Submit the POST request
			$result = curl_exec($ch);
			$obj = json_decode($result, true);

			// print_r ($obj);
			// echo $obj["status"];
			// Close cURL session handle
			curl_close($ch);
			header('location:../success.html');
	 
	 ?>
	<div class="container"> 
	<div class="panel panel-danger">
	  <div class="panel-heading">Signature Verification failed</div>
	  <div class="panel-body">
	  	<!-- <div class="container"> -->
	 		<table class="table table-hover">
			    <tbody>
			      <tr>
			        <td>Order ID</td>
			        <td><?php echo $orderId; ?></td>
			      </tr>
			      <tr>
			        <td>Order Amount</td>
			        <td><?php echo $orderAmount; ?></td>
			      </tr>
			      <tr>
			        <td>Reference ID</td>
			        <td><?php echo $referenceId; ?></td>
			      </tr>
			      <tr>
			        <td>Transaction Status</td>
			        <td><?php echo $txStatus; ?></td>
			      </tr>
			      <tr>
			        <td>Payment Mode </td>
			        <td><?php echo $paymentMode; ?></td>
			      </tr>
			      <tr>
			        <td>Message</td>
			        <td><?php echo $txMsg; ?></td>
			      </tr>
			      <tr>
			        <td>Transaction Time</td>
			        <td><?php echo $txTime; ?></td>
			      </tr>
			    </tbody>
			</table>
		<!-- </div> -->
	  </div>	
	</div>	
	</div>
	
	<?php	
	 	}
	 ?>

</body>
</html>



