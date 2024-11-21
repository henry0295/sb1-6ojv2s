<?php
namespace App\Services;

class AsteriskManager {
    private $socket;
    private $host;
    private $port;
    private $username;
    private $secret;

    public function __construct() {
        $this->host = $_ENV['ASTERISK_HOST'];
        $this->port = $_ENV['ASTERISK_PORT'];
        $this->username = $_ENV['ASTERISK_USERNAME'];
        $this->secret = $_ENV['ASTERISK_SECRET'];
    }

    public function connect() {
        $this->socket = fsockopen($this->host, $this->port, $errno, $errstr, 30);
        if (!$this->socket) {
            throw new \Exception("Could not connect to Asterisk AMI: $errstr ($errno)");
        }

        $this->login();
    }

    public function originateCall($extension, $context, $channel) {
        $action = [
            'Action: Originate',
            'Channel: ' . $channel,
            'Context: ' . $context,
            'Exten: ' . $extension,
            'Priority: 1',
            'Async: yes'
        ];

        return $this->sendCommand($action);
    }

    private function login() {
        $login = [
            'Action: Login',
            'Username: ' . $this->username,
            'Secret: ' . $this->secret
        ];

        return $this->sendCommand($login);
    }

    private function sendCommand($commands) {
        $command = implode("\r\n", $commands) . "\r\n\r\n";
        fwrite($this->socket, $command);
        
        return $this->readResponse();
    }

    private function readResponse() {
        $response = '';
        while ($line = fgets($this->socket)) {
            $response .= $line;
            if ($line == "\r\n") break;
        }
        return $response;
    }
}