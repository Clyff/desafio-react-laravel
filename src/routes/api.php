<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('clients', 'ClientController@index');
Route::post('clients', 'ClientController@store');
Route::get('clients/edit/{id}', 'ClientController@edit');
Route::post('clients/edit/{id}', 'ClientController@update');

Route::get('deliveries', 'DeliveryController@index');
Route::post('deliveries', 'DeliveryController@store');
Route::get('deliveries/edit/{id}', 'DeliveryController@edit');
Route::post('deliveries/edit/{id}', 'DeliveryController@update');
Route::post('deliveries/destroy/{id}', 'DeliveryController@destroy');
