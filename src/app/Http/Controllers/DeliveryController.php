<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Delivery;
use App\Client;

class DeliveryController extends Controller
{
  /**
   * Display a listing of the resource.
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $deliveries = Delivery::with('client')
      ->orderBy('date', 'desc')
      ->get();

    return response()->json($deliveries);
  }

  /**
   * Store a newly created resource in storage.
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $validatedData = $request->validate([
      'client_id' => ['required', 'exists:clients,id'],
      'date' => ['required', 'date_format:Y-m-d'],
      'start' => ['required', 'max:255'],
      'end' => ['required', 'max:255']
    ]);

    $delivery = Delivery::create([
      'client_id' => $validatedData['client_id'],
      'date' => $validatedData['date'],
      'start' => $validatedData['start'],
      'end' => $validatedData['end']
    ]);

    return response()->json('Delivery created!');
  }

  /**
   * Show the form for editing the specified resource.
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
  {
      $delivery = Delivery::find($id);
      $clients = Client::all();

      return response()->json([
        'delivery' => $delivery,
        'clients' => $clients
      ]);
  }

  /**
   * Update the specified resource in storage.
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
      $delivery = Delivery::find($id);

      $validatedData = $request->validate([
        'client_id' => ['required', 'exists:clients,id'],
        'date' => ['required', 'date'],
        'start' => ['required', 'max:255'],
        'end' => ['required', 'max:255']
      ]);

      $delivery->client_id = $validatedData['client_id'];
      $delivery->date = $validatedData['date'];
      $delivery->start = $validatedData['start'];
      $delivery->end = $validatedData['end'];
      $delivery->save();

      return response()->json('Delivery Updated Successfully.');
  }

  /**
   * Remove the specified resource from storage.
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $delivery = Delivery::find($id);
    $delivery->delete();

    return response()->json('Delivery Deleted Successfully.');
  }
}
