<?php

$default = '/index.html';
$file = $_SERVER['PATH_INFO'] ?? $default;

if ($file === $default) {
    header('Cross-Origin-Embedder-Policy: require-corp');
    header('Cross-Origin-Opener-Policy: same-origin');
    readfile(".$file");
} else if (preg_match(
    '/^\/ogv-(worker-(audio|video)|(demuxer|decoder-audio|decoder-video)-(ogg|webm|theora|vorbis|opus|vp8|vp9|av1)-(wasm|mt-wasm))\.(js|worker\.js|wasm)$/',
    $file
)) {
    if (preg_match('/\.js$/', $file)) {
        header('Content-Type: text/javascript');
        header('Cross-Origin-Embedder-Policy: require-corp');
        header('Cross-Origin-Opener-Policy: same-origin');
    } else if (preg_match('/.wasm$/', $file)) {
        header('Content-Type: application/wasm');
        header('Cross-Origin-Resource-Policy: same-origin');
    }
    readfile("./lib$file");
} else {
    http_response_code(403);
    ?><!DOCTYPE html>
        <html>
            <head>
                <meta charset=utf-8>
                <title>Access denied</title>
            </head>
            <body>
                <h1>Access denied</h1>
            </body>
        </html>
    <?php
}
