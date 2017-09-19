<?php

namespace BackendBundle\Controller;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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

    
}
