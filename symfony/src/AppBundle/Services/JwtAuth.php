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

			$token = array(
				"sub" => $user->getId(),
				"email" => $user->getEmail(),
				"name" => $user->getName(),
				"surname" => $user->getSurname(),
				"password" => $user->getPassword(),
				"image" => $user->getImage(),
				"iat" => time(),
				"exp" => time () + (7 * 25 * 60 * 60)
				);

			$jwt = JWT::encode($token, $key, 'HS256');

			$decoded = JWT::decode($jwt, $key, array('HS256'));

			if ($getHash != null) {
				
				return $jwt;
			}else{

				return $decoded;
			}

			
		}else{

			return array("status" => "error", "data"=>"Login failed!!");
		}
	}
}