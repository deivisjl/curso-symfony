<?php

namespace AppBundle\Controller;

use BackendBundle\Entity\User;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;

class UserController extends Controller
{

	public function newAction(Request $request){

		$helpers = $this->get("app.helpers");

		$json = $request->get("json",null);

		$params = json_decode($json);

		$data = array();

		if ($json != null) {
			
			$createdAt = new Datetime("now");

			$role = "user";

			$image = null;

			$email = (isset($params->email)) ? $params->email : null;

			$name = (isset($params->name) && ctype_alpha($params->name)) ? $params->name : null;

			$surname = (isset($params->surname) && ctype_alpha($params->surname)) ? $params->surname : null;

			$password = (isset($params->password)) ? $params->password : null;

			$emailConstraint = new Assert\Email();

			$emailConstraint->message = "This email is no valid";

			$validate_email = $this->get("validator")->validate($email, $emailConstraint);

			if ($email != null && count ($validate_email) == 0 && 
				$password != null && $name != null && $surname != null) {
					
					$user = new User();

					$user->setCreatedAt($createdAt);

					$user->setImage($image);

					$user->setRole($role);

					$user->setEmail($email);

					$user->setName($name);

					$user->setSurname($surname);

					$user->setPassword($password);

					$em = $this->getDoctrine()->getManager();

					$isset_user = $em->getRepository("BackendBundle:User")->findBy(
							array("email" => $email)
						);

					if (count($isset_user) == 0) {
						
						$em->persist($user);

						$em->flush();

						$data["status"] = 'success';

						$data["msg"] = 'New user Created';
					}else{

						$data = array(
						"status" => "error",
						"code" => 400,
						"msg" => "User not created, duplicate register"
					);
					}
			}

		}else{

			$data = array(
					"status" => "error",
					"code" => 400,
					"msg" => "User not created"
				);
		}

		return $helpers->json($data);

	}
}