<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Client;

class ClientController extends Controller
{
  /**
   * Display a listing of the resource.
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $clients = Client::orderBy('name', 'asc')->get();

    return response()->json($clients);
  }

  /**
   * Store a newly created resource in storage.
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $validatedData = $request->validate([
      'name' => ['required', 'max:255']
    ]);

    $client = Client::create([
      'name' => $validatedData['name']
    ]);

    return response()->json('Client created!');
  }

  /**
   * Show the form for editing the specified resource.
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
  {
      $client = Client::find($id);

      return response()->json($client);
  }

  /**
   * Update the specified resource in storage.
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
      $client = Client::find($id);

      $validatedData = $request->validate([
        'name' => ['required', 'max:255']
      ]);

      $client->name = $validatedData['name'];
      $client->save();

      return response()->json('Client Updated Successfully.');
  }
}
