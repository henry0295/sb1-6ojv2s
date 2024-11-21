<?php
namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AgentController {
    public function list(Request $request, Response $response) {
        $agents = [
            ['id' => 1, 'name' => 'John Doe', 'status' => 'available'],
            ['id' => 2, 'name' => 'Jane Smith', 'status' => 'on-call']
        ];
        
        $response->getBody()->write(json_encode($agents));
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function create(Request $request, Response $response) {
        $data = $request->getParsedBody();
        
        // Validate and create agent
        $agent = [
            'id' => uniqid(),
            'name' => $data['name'],
            'email' => $data['email'],
            'extension' => $data['extension']
        ];
        
        $response->getBody()->write(json_encode($agent));
        return $response->withHeader('Content-Type', 'application/json');
    }
}