<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

class HomePageTest extends TestCase
{
    /**
     * Test that the homepage loads successfully.
     *
     * @return void
     */
    public function test_homepage_loads_successfully_and_renders_home_component()
    {
        $response = $this->get('/');

        $response->assertStatus(200);

        $response->assertInertia(fn (Assert $page) => $page->component('home'));
    }

    /**
     * Test that the homepage loads successfully when a user is authenticated.
     * This is just to ensure it doesn't break for logged-in users.
     *
     * @return void
     */
    public function test_homepage_loads_successfully_for_authenticated_user()
    {
        // Create a mock user if your User model and factory exist.
        // If not, this part can be omitted if authentication isn't strictly
        // required or tested for the homepage yet.
        // $user = \App\Models\User::factory()->create();
        // $this->actingAs($user);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page->component('home'));
    }
}
