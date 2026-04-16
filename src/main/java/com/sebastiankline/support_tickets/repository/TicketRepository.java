package com.sebastiankline.support_tickets.repository;

import com.sebastiankline.support_tickets.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}