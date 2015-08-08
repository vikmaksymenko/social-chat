<?php
	$url = 'https://demo.socialcast.com/api/messages.json ';
	$email = 'emily@socialcast.com';
	$password = 'demo';

	$ch = curl_init();
	$opt =  array(
		CURLOPT_URL => $url,
		CURLOPT_HEADER => FALSE,
		CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
		CURLOPT_USERPWD => $email . ":" . $password,
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_SSL_VERIFYPEER => FALSE,
	);

	curl_setopt_array($ch, $opt);

	$returnValue = curl_exec($ch);
	echo $returnValue;

	curl_close($ch);
?>