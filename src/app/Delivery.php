<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    protected $fillable = ['client_id', 'date', 'start', 'end'];

    public function client()
    {
        return $this->belongsTo('App\Client');
    }

    protected $casts = [
        'start' => 'array',
        'end' => 'array'
    ];
}
