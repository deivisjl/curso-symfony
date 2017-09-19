<?php

namespace BackendBundle\Controller;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
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

    	$json = $request->get("json",null);


    	if ($json != null) {
    		
    		$params = json_decode($json);

    		$email = (isset($params->email)) ? $params->email : null;

    		$password = (isset($params->password)) ? $params->password : null;

    		$emailConstraint = new Assert\Email();

    		$emailConstraint->message = "This email is not valid!!";

    		$validate_email = $this->get("validator")->validate($email,$emailConstraint);

    		if (count($validate_email) == 0 && $password != null) {
    			
    			echo "Data success!!";
    		}else{

    			echo "Data incorrect!!";
    		}


    	}else{

    		echo "Send json with post!";
    	}

    	die();
    }

    
}
