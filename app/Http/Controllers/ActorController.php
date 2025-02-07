<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActorController extends Controller
{
    public function details($name, $id){
        $actor = Actor::where('id', decryptString($id))->with('images')->first();

        return Inertia::render('Actor/Index', [
            'title' => $actor->name,
            'actor' => $actor
        ]);
    }
}
