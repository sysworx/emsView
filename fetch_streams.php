<?php
// ------------ Config --------------------------
$api_key = 'yourApiKey';
$emby_server = 'https://emby.domain.com';
// ------------ Config --------------------------

$url = $emby_server . '/Sessions?api_key=' . $api_key;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);

$response = curl_exec($ch);
curl_close($ch);

// Interpretiert die Antwort von cURL als JSON
$streams = json_decode($response, true);

// Stellt das finale Antwort-Array zusammen
$finalResponse = [
    'baseUrl' => $emby_server,
    'streams' => $streams
];

// Setzt den Header, um anzuzeigen, dass die Antwort im JSON-Format ist
header('Content-Type: application/json');

// Gibt die Antwort als JSON aus
echo json_encode($finalResponse);
?>