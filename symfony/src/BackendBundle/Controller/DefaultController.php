<?php

namespace BackendBundle\Controller;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('BackendBundle:Default:index.html.twig');

    }


    public function pruebasAction()
    {
        //return $this->render('BackendBundle:Default:index.html.twig');
        $helpers = $this->get("app.helpers");

        $em = $this->getDoctrine()->getManager();

        $users = $em->getRepository('BackendBundle:User')->findAll();

        return $helpers->json($users);
    }

    public function loginAction(Request $request){

    	$helpers = $this->get("app.helpers");
    	$jwt_auth = $this->get("app.jwt_auth");

    	$json = $request->get("json",null);


    	if ($json != null) {
    		
    		$params = json_decode($json);

    		$email = (isset($params->email)) ? $params->email : null;

    		$password = (isset($params->password)) ? $params->password : null;

    		$getHash = (isset($params->gethash)) ? $params->gethash : null;

    		$emailConstraint = new Assert\Email();

    		$emailConstraint->message = "This email is not valid!!";

    		$validate_email = $this->get("validator")->validate($email,$emailConstraint);

    		if (count($validate_email) == 0 && $password != null) {

    			if ($getHash == null) {
    				
    				$signIn = $jwt_auth->signIn($email,$password);    			

    			}else{

    				$signIn = $jwt_auth->signIn($email,$password,true);    			
    				
    			}
    			
    			return new JsonResponse($signIn);
    			

    		}else{

    			return $helpers->json(array(
    				"status" => "Error",
    				"data" => "Login not valid"
    				));
    		}


    	}else{

    		return $helpers->json(array(
    				"status" => "Error",
    				"data" => "Send json with post"
    				));
    	}

    	
    }

    
}
