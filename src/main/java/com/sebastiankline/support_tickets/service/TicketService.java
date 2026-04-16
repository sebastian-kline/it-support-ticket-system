package com.sebastiankline.support_tickets.service;

import com.sebastiankline.support_tickets.model.Ticket;
import com.sebastiankline.support_tickets.repository.TicketRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    // GET LOGIC
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Long id) {
        return findTicketByIdOrThrow(id);
    }

    // CREATE LOGIC
    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    // UPDATE LOGIC
    public Ticket updateTicket(Long id, Ticket updatedTicket) {
        Ticket existingTicket = findTicketByIdOrThrow(id);

        existingTicket.setTitle(updatedTicket.getTitle());
        existingTicket.setDescription(updatedTicket.getDescription());
        existingTicket.setSubmittedBy(updatedTicket.getSubmittedBy());
        existingTicket.setStatus(updatedTicket.getStatus());
        existingTicket.setPriority(updatedTicket.getPriority());

        return ticketRepository.save(existingTicket);
    }

    // DELETE LOGIC
    public void deleteTicket(Long id) {
        Ticket existingTicket = findTicketByIdOrThrow(id);

        ticketRepository.delete(existingTicket);
    }

    // ERROR HANDLING FUNCTION
    private Ticket findTicketByIdOrThrow(Long id) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(id);

        if(optionalTicket.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found with id" + id);
        }

        return optionalTicket.get();
    }
}