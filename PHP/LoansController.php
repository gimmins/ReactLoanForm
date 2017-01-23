<?php
namespace RESTfulApi;

class LoansController
{
    public $db;

    function __construct($db) {
        $this->db = $db;
    }

    // URL Pattern: /loans
    // METHOD:	  GET
    public function getAction($loan_id) {
        $sql = "SELECT * FROM `applications` where `id`='$loan_id'";
        return $this->db->query($sql);
    }

    // URL Pattern: /loans
    // METHOD:      POST
    // BODY:        loan_amount, property_value, social_security
    public function setAction($body) {
  	$loan_amount = $body['loanAmount'];
	$property_value = $body['propertyValue'];
        $social_security = $body['socialSecurity'];
        
        $sql = "SELECT * FROM `applications` where `social_security`='$social_security'";
        $res = $this->db->query($sql);
        if (mysqli_num_rows($res)) {
            return null;
        }
        
        if ($this->validateLoan($loan_amount, $property_value)) {
            $sql = 'INSERT INTO `applications` (`amount`, `property_value`, `social_security`, `status`)';
            $values = " VALUES ('$loan_amount', '$property_value', '$social_security', '1')";

            $result = $this->db->query($sql . $values);

            if ($result) {
                $sql = "SELECT * FROM `applications` ORDER BY `id` DESC LIMIT 1";	  
                return $this->db->query($sql);
            }
        } else {
            $sql = 'INSERT INTO `applications` (`amount`, `property_value`, `social_security`, `status`)';
            $values = " VALUES ('$loan_amount', '$property_value', '$social_security', '0')";

            $result = $this->db->query($sql . $values);

            if ($result) {
                $sql = "SELECT * FROM `applications` ORDER BY `id` DESC LIMIT 1";	  
                return $this->db->query($sql);
            }
        }
    }
    
    public function validateLoan($loan_amount, $property_value) {
        return ($loan_amount / $property_value) * 100 <= 40;
    }
}
