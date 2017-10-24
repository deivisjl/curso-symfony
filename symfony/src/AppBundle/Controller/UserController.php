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
			
			$createdAt = new \Datetime("now");

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

					$pwd = hash('sha256', $password);

					$user->setPassword($pwd);

					$em = $this->getDoctrine()->getManager();

					$isset_user = $em->getRepository("BackendBundle:User")->findBy(
							array("email" => $email)
						);

					if (count($isset_user) == 0) {
						
						$em->persist($user);

						$em->flush();

						$data["status"] = 'success';

						$data["code"] = 200;

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


	public function editAction(Request $request){

		$helpers = $this->get("app.helpers");

		$hash = $request->get("authorization",null);

		$authCheck = $helpers->authCheck($hash);

		if ($authCheck == true) {

			$identity =  $helpers->authCheck($hash,true);

			$em = $this->getDoctrine()->getManager();

			$user = $em->getRepository("BackendBundle:User")->findOneBy(
					array(
							"id" => $identity->sub
						)
				);

		$json = $request->get("json",null);

		$params = json_decode($json);

		$data = array();

		if ($json != null) {
			
			$createdAt = new \Datetime("now");

			$role = "user";

			$image = null;

			$email = (isset($params->email)) ? $params->email : null;

			$name = (isset($params->name) && ctype_alpha($params->name)) ? $params->name : null;

			$surname = (isset($params->surname) && ctype_alpha($params->surname)) ? $params->surname : null;

			$password = (isset($params->password)) ? $params->password : null;

			$emailConstraint = new Assert\Email();

			$emailConstraint->message = "This email is no valid";

			$validate_email = $this->get("validator")->validate($email, $emailConstraint);

			if ($email != null && count($validate_email) == 0 && $name != null && $surname != null) {

					$user->setCreatedAt($createdAt);

					$user->setImage($image);

					$user->setRole($role);

					$user->setEmail($email);

					$user->setName($name);

					$user->setSurname($surname);

					if ($password != null  && !empty($params->password)) {
						
						$pwd = hash('sha256', $password);

						$user->setPassword($pwd);	
					}

					

					$em = $this->getDoctrine()->getManager();

					$isset_user = $em->getRepository("BackendBundle:User")->findBy(
							array("email" => $email)
						);

					if (count($isset_user) == 0 || $identity->email == $email) {
						
						$em->persist($user);

						$em->flush();

						$data["status"] = 'success';

						$data["code"] = 200;

						$data["msg"] = 'User Modified';
					}else{

						$data = array(
							"status" => "error",
							"code" => 400,
							"msg" => "User not modified"
						);
					}
			}else{
				$data = array(
					"status" => "error",
					"code" => 400,
					"msg" => "No se pudieron procesar algunos valores"
				);

			}

		}else{

			$data = array(
					"status" => "error",
					"code" => 400,
					"msg" => "User not created"
				);
		}

	}else{ //if not authCheck

		$data = array(
			"status" => "error",
            "code" => 400,
            "msg" => "Authorization not valid"
			);
	}

		return $helpers->json($data);

	}

	public function uploadImageAction(Request $request){

		$helpers = $this->get("app.helpers");

		$hash = $request->get("authorization", null);

		$authCheck = $helpers->authCheck($hash);

		if ($authCheck) {
			
			$identity = $helpers->authCheck($hash, true);

			$em = $this->getDoctrine()->getManager();

			$user = $em->getRepository("BackendBundle:User")->findOneBy(
					array(
						"id" => $identity->sub
						)
				);

			$file = $request->files->get("image");

			if (!empty($file) && $file != null) {
				
				$ext = $file->guessExtension();

				if ($ext == "jpeg" || $ext == "jpg" || $ext == "png" || $ext == "gif") {
					
					$file_name = time().".".$ext;

					$file->move("uploads/users", $file_name);

					$user->setImage($file_name);

					$em->persist($user);

					$em->flush();

					$data = array(
							"status" => "success",
							"code" => 200,
							"msg" => "Image upload"
						);

				}else{

					$data = array(
					"status" => "error",
					"code" => 200,
					"msg" => "Extension not valid"
					);
				}

				
			}else{

				$data = array(
					"status" => "error",
					"code" => 400,
					"msg" => "Image not upload"
					);
			}

		}else{

			$data = array(
					"status" => "error",
					"code" => 400,
					"msg" => "Authorization not valid"

				);
		}

		return $helpers->json($data);
	}

	public function channelAction(Request $request, $id = null){

		$helpers = $this->get("app.helpers");

		$em = $this->getDoctrine()->getManager();

		$user = $em->getRepository("BackendBundle:User")->findOneBy(array(

				"id" => $id
			));

		$dql = "SELECT v from BackendBundle:Video v WHERE v.user = $id ORDER BY v.id DESC";

		$query = $em->createQuery($dql);

		$page = $request->query->getInt("page",1);

		$paginator = $this->get("knp_paginator");

		$items_per_page = 6;

		$pagination = $paginator->paginate($query, $page, $items_per_page);

		$total_items_count = $pagination->getTotalItemCount();

		if (count($user) == 1) {

			$data = array(
				"status" => "success",
				"total_items_count" => $total_items_count,
				"current_page" => $page,
				"items_per_page" => $items_per_page,
				"total_pages" => ceil($total_items_count / $items_per_page)
				
			);

			$data["data"]["videos"] = $pagination;
			$data["data"]["user"] = $user;

		}else{

			$data = array(

					"status" => 'error',
					"code" => 400,
					"msg" => "User dont exists"
				);

		}


		return $helpers->json($data);

	}
}