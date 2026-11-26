<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DipositController extends Controller
{
    public function index(){
        return Inertia::render('diposit');
    }

    public function store(){

    }
}
