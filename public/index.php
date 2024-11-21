<?php
require __DIR__ . '/../vendor/autoload.php';

use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy;

$app = AppFactory::create();

// Middleware
$app->addErrorMiddleware(true, true, true);
$app->addBodyParsingMiddleware();

// Routes
$app->group('/api', function (RouteCollectorProxy $group) {
    // Agents
    $group->get('/agents', 'App\Controllers\AgentController:list');
    $group->post('/agents', 'App\Controllers\AgentController:create');
    
    // Campaigns
    $group->get('/campaigns', 'App\Controllers\CampaignController:list');
    $group->post('/campaigns', 'App\Controllers\CampaignController:create');
    
    // Calls
    $group->get('/calls', 'App\Controllers\CallController:list');
    $group->post('/calls/dial', 'App\Controllers\CallController:dial');
});

$app->run();