<?php
if(isset($_POST['razorpay_idpay'])){
    $response1 = array();  
    $from_ip = $_SERVER['REMOTE_ADDR'];
    $from_browser = $_SERVER['HTTP_USER_AGENT'];
    date_default_timezone_set("Asia/Calcutta");
    $date_now = date("r");

    $payementid = urlencode($_POST['razorpay_idpay']) ;
    
    $amounts = urlencode($_POST['amounts']);
    $amounts = $amounts*100 ;
    $currency_code = "INR";
    function get_curl_handle($payementid, $data) {
    $url = 'https://api.razorpay.com/v1/payments/' . $payementid . '/capture';
    // prod
    $key_id = "rzp_live_MnWjIg6CvzwE2K";
    $key_secret = "GOVbQkQIf1YUJrlx35bSBXOb";
    //test
    // $key_id = "rzp_test_RmpJQEiO2yqpxv";
    // $key_secret = "GOVbQkQIf1YUJrlx35bSBXOb";
    $params = http_build_query($data);
    //cURL Request
    $ch = curl_init();
    //set the url, number of POST vars, POST data
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_USERPWD, $key_id . ':' . $key_secret);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    return $ch;
}
$data = array(
    'amount' => $amounts,
    'currency' => $currency_code,
);
$success = false;
$error = '';
try {
    $ch = get_curl_handle($payementid, $data);
    //execute post
    $result = curl_exec($ch);
    $data = json_decode($result);
   
    $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
 
    if ($result === false) {
        $success = false;
        $error = 'Curl error: ' . curl_error($ch);
    } else {
        $response_array = json_decode($result, true);
        //Check success response
        if ($http_status === 200 and isset($response_array['error']) === false) {
            $success = true;
        } else {
            $success = false;
            if (!empty($response_array['error']['code'])) {
                $error = $response_array['error']['code'] . ':' . $response_array['error']['description'];
            } else {
                $error = 'Invalid Response <br/>' . $result;
            }
        }
    }
    //close connection
    curl_close($ch);
} catch (Exception $e) {
    $success = false;
    $error = 'Request to Razorpay Failed';
}
if ($success === true) {
    $capture_status = "Captured" ;
}else{
    $capture_status = $error ;
}
    $response1['status'] = 201;
    $response1['total'] = $success ;
    $response1['currency_code'] = $error ;
    $response1['capture_status'] = $capture_status ;
    echo json_encode($response1);
}

?>