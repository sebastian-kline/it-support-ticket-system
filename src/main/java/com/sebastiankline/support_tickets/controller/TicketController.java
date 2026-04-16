package com.sebastiankline.support_tickets.controller;

import com.sebastiankline.support_tickets.model.Ticket;
import com.sebastiankline.support_tickets.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TicketController {
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    // READ

    @GetMapping("/tickets")
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/tickets/{id}")
    public Ticket getTicket(@PathVariable Long id) {
        return ticketService.getTicketById(id);
    }

    // CREATE
    @PostMapping("/tickets")
    public Ticket createTicket(@Valid @RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

    // UPDATE
    @PutMapping("/tickets/{id}")
    public Ticket updateTicket(@PathVariable Long id, @Valid @RequestBody Ticket updatedticket) {
        return ticketService.updateTicket(id, updatedticket);
    }

    // DELETE
    @DeleteMapping("/tickets/{id}")
    public void deleteTicket (@PathVariable Long id) {
        ticketService.deleteTicket(id);
    }

}