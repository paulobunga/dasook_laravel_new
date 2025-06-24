<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the homepage.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // For now, we are not passing any dynamic data from the backend.
        // The frontend component `home.tsx` will use its internal mock data.
        return Inertia::render('home');
    }
}
