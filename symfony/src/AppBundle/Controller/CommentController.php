<?php 

namespace AppBundle\Controller;

use BackendBundle\Entity\User;
use BackendBundle\Entity\Video;
use BackendBundle\Entity\Comment;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;

/**
* 
*/
class CommentController extends Controller
{

	public function newAction(Request $request){
		
		$helpers = $this->get("app.helpers");

		$hash = $request->get("authorization", null);

		$authCheck = $helpers->authCheck($hash);

		if ($authCheck) {
			
			$identity = $helpers->authCheck($hash, true);

			$json = $request->get("json", null);			

			if ($json != null) {

				$params = json_decode($json);

				$createdAt = new \Datetime('now');

				$user_id = (isset($identity->sub)) ? $identity->sub : null;

				$video_id = (isset($params->video_id)) ? $params->video_id : null;

				$body = (isset($params->body)) ? $params->body : null;

				if ($user_id != null && $video_id != null) {
					
					$em = $this->getDoctrine()->getManager();

					$user = $em->getRepository("BackendBundle:User")->findOneBy(array(
							"id" => $user_id
						));

					$video = $em->getRepository("BackendBundle:Video")->findOneBy(array(
							"id" => $video_id
						));

					$comment = new Comment();

					$comment->setUser($user);

					$comment->setVideo($video);

					$comment->setBody($body);

					$comment->setCreatedAt($createdAt);

					$em->persist($comment);

					$em->flush();


					$data = array(

					"status" => 'ok',
					"code" => 200,
					"msg" => "Comment added success"
				);





				}else{

					$data = array(

							"status" => 'error',
							"code" => 400,
							"msg" => "Comment not added"
						);
				}
				
			}else{

				$data = array(

					"status" => 'error',
					"code" => 400,
					"msg" => "Params not valid"
				);
			}

		}else{

			$data = array(

					"status" => 'error',
					"code" => 400,
					"msg" => "Authentication not valid"
				);
		}

		return $helpers->json($data);
	}
}