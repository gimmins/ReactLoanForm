<?php
namespace JSONFormatter;

class LoansBuilder 
{
    public function toJson($tasks) {
        echo '[';
        for ($i=0; $i<mysqli_num_rows($tasks); $i++) {
            echo ($i>0?',':'').json_encode(mysqli_fetch_object($tasks));
	}
        echo ']';
	}
	
    public function toErrorJson($reason) {
        var_dump(http_response_code(404));
    }
}
