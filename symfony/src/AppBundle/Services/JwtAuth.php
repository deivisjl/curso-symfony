<?php 

namespace AppBundle\Services;

use Firebase\JWT\JWT;

/**
* 
*/
class JwtAuth
{
	
	public $manager;

	function __construct($manager)
	{
		$this->manager = $manager;
	}

	public function signIn($email, $password, $getHash = NULL){

		$key = "clave-secreta";

		$user = $this->manager->getRepository('BackendBundle:User')->findOneBy(
				array(
					"email" => $email,
					"password" => $password
					)
			);
		$signIn = false;

		if (is_object($user)) {
			
			$signIn = true;


		}
		if ($signIn == true) {
			
			return array("status" => "success", "data"=>"Login success!!");
		}else{

			return array("status" => "error", "data"=>"Login failed!!");
		}
	}
}