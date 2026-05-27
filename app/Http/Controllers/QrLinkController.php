<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QrLink;

class QrLinkController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'url' => 'required|url',
        ]);

        QrLink::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, QrLink $qrLink)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'url' => 'required|url',
        ]);

        $qrLink->update($validated);

        return redirect()->back();
    }

    public function destroy(QrLink $qrLink)
    {
        $qrLink->delete();

        return redirect()->back();
    }
}
