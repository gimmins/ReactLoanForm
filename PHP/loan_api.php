<?php
namespace Api;

include 'LoansController.php';
include 'LoansBuilder.php';
include 'LoansDB.php';

use RESTfulApi;
use JSONFormatter;
use Database;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);

$db = new \Database\LoansDB();
$loans_controller = new \RESTfulApi\LoansController($db);
$loans_builder = new \JSONFormatter\LoansBuilder();

switch ($method) {
    case 'GET':
        $res = $loans_controller->getAction($request[1]);
        if (mysqli_num_rows($res)) {
            $loans_builder->toJson($res);
        } else {
            $loans_builder->toErrorJson('No records with ID found');
        }
        break;

    case 'POST':
        $res = $loans_controller->setAction($input);
        if ($res) {
            $loans_builder->toJson($res);
        } else {
            $loans_builder->toErrorJson('Record with same social security already exists');
        }
        break;
}

$db->close();
